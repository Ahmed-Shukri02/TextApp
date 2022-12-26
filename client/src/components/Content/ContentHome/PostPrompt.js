import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { StockImages } from "../../../Contexts/StockImages";
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";
import {MediaContext} from "../../../Contexts/MediaContext"

import { useSelector, useDispatch } from "react-redux";
import { setModalStatus } from "../../../Tools/modalStatus";
import Modal from "../../Modals/Modal";
import ContentPostMock from "../ContentMocks/ContentPostMock";
import { motion, AnimatePresence } from "framer-motion";
import Inputs from "../../Inputs/Inputs";
import serverLocation from "../../../Tools/serverLocation";

export default function PostPrompt({posts, userInfo, setPosts}){

  const {images, loadedImages} = useContext(StockImages)
  const {isTablet} = useContext(MediaContext)
  const textBox = useRef(null)
  const textContainer = useRef(null)
  const [isPosting, setIsPosting] = useState(false)
  const [longLoading, setLongLoading] = useState(false)
  const [uploadImages, setUploadImages] = useState([])
  const [mockPost, setMockPost] = useState({})

  const [ErrorStatus, setErrorStatus] = useState({error: false, message: null})
  const errorStatuses = {
    noError: {error: false, message: null},
    imageTooBig: {
      error: true, message: "image size should be less than 2MB!"
    },
    videoTooBig: {
      error: true, message: "video size should be less than 100MB!"
    }
  }
  //console.log(isPosting)

  const dispatch = useDispatch()
  const modalStatus = useSelector((state) => state.modalStatus.value)
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)
  

  // useEffect used only for checking and initialising post prompt
  useEffect(() => {
    // add event listener to ref object
    textBox.current.style.height = "5em"
    textBox.current.addEventListener("input", () => {
      let fontSize = parseInt(window.getComputedStyle(textBox.current).fontSize)
      
      textBox.current.style.height = "auto";
      textBox.current.style.height = textBox.current.scrollHeight < (fontSize * 5) ? `5em` : textBox.current.scrollHeight + "px"
      textBox.current.style.overflowY = "hidden"
    })

  }, [])

  useEffect(() => {
    if(isPosting){
      setTimeout(() => {
        console.log(isPosting)
        setLongLoading(isPosting)
      }, 3000);
    }
  }, [isPosting])
  
  async function handlePost(e){
    e.preventDefault()
    if(!e.target.elements["text"].value){
      console.log("empty message")
      return;
    }
    
    setIsPosting(true)
    console.log(isPosting)
    let {text} = e.target.elements
    
    try{
      let newPosts = await fetch(` ${serverLocation}/api/users/user_posts`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
        },
        body: JSON.stringify({text: text.value.replace("'", "''")})
      })

      let newPostsJson = await newPosts.json()
      console.log(newPostsJson)

      let finalPosts = [...posts]
      finalPosts.unshift(newPostsJson[0])

      if(uploadImages.length){
        const imagesForm = new FormData();
        imagesForm.append("image", uploadImages[0])
        
        var type = uploadImages[0].type
        if (!type.match("video/*") && !type.match("image/*")){
          console.log("wrong file format")
          return;
        } type = type.match("video/*")? "video" : "image";
        console.log(type)
  
        let res = await fetch(`${serverLocation}/api/media/${newPostsJson[0].post_id}/uploads?type=${type}`, {
          method: "POST",
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
          },
          body: imagesForm
        })

        let resJson = await res.json()
        console.log(resJson)
      }
      

      setPosts(finalPosts)
      setIsPosting(false)
      setLongLoading(false)

      // reset post prompt
      setUploadImages([])
      e.target.elements["text"].value = ""
    }
    catch(err){
      console.log(err)
    }
  }

  function refreshMockPost(){

  }

  function addMedia(e, type){
    e.preventDefault()
    let media = e.target.files[0]

    switch(type){
      case "image": {
        if(media.size > 2097152){
          setErrorStatus(errorStatuses.imageTooBig)
          return;
        }
    
        setErrorStatus(errorStatuses.noError)
        console.log(media)
    
        if(media) setUploadImages([media])

      }
      case "video": {
        if(media.size > 104857600){
          setErrorStatus(errorStatuses.videoTooBig)
          return;
        }
    
        setErrorStatus(errorStatuses.noError)
        console.log(media)
    
        if(media) setUploadImages([media])
      }
      default : {console.log("incorrect query"); return}
    }
  }
  
  function submitMedia(e){
    e.preventDefault()
    dispatch(setModalStatus(false))
  }

  function openMediaModal(modalID){
    console.log(textBox)
    if(textBox.current?.value){
      setMockPost({post_text: textBox.current.value})
    }
    else{
      setMockPost({})
    }

    dispatch(setModalStatus(modalID))
  }

  // COMPONENT
  function ImageModal(){
    return (
      <Modal modalID="image-modal">
        <div className="media-modal">
          <h1 className="media-modal-title"> Upload your image here </h1>
          <div className="media-modal-flex">
            <form onChange={e => addMedia(e, "image")} onSubmit={e => submitMedia(e, "image")} className="media-modal-left">
              <div style={{textAlign: "justified", padding: "1em 0", maxWidth: "45ch"}}>This current version does not support multiple file uploads. But don't worry, this feature is currently being worked on and will be added soon</div>
              {ErrorStatus.error && ErrorStatus.message}
              <Inputs.File accept="image/*" name="image"/>
              <div style={{marginTop: "1em"}}><Buttons.DefaultButton contentColor="white" height="2em" width="7em" submit={true}>Submit</Buttons.DefaultButton></div>
            </form>
            <div className="media-modal-right content-home">
              <h3 style={{textAlign: "center"}}> This is how your post will look like </h3>
              <div className="content-home-right">
                <ContentPostMock postInfo={mockPost} userInfo={client} media={uploadImages} mediaType="image"/>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  function VideoModal(){
    return (
      <Modal modalID="video-modal">
        <div className="media-modal">
          <h1 className="media-modal-title"> Upload your video here </h1>
          <div className="media-modal-flex">
            <form onChange={e => addMedia(e, "video")} onSubmit={e => submitMedia(e, "video")}  className="media-modal-left">
              <div style={{textAlign: "justified", padding: "1em 0", maxWidth: "45ch"}}>This current version does not support multiple file uploads. But don't worry, this feature is currently being worked on and will be added soon</div>
              {ErrorStatus.error && ErrorStatus.message}
              <Inputs.File accept="video/mp4,video/x-m4v,video/*" name="image"/>
              <div style={{marginTop: "1em"}}><Buttons.DefaultButton contentColor="white" height="2em" width="7em" submit={true}>Submit</Buttons.DefaultButton></div>
            </form>
            <div className="media-modal-right content-home">
              <h3 style={{textAlign: "center"}}> This is how your post will look like </h3>
              <div className="content-home-right">
                <ContentPostMock postInfo={mockPost} userInfo={client} media={uploadImages} mediaType="video"/>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  return(
    <div className="post-prompt" ref={textContainer}>
      {ImageModal()}
      {VideoModal()}
      
      <form className="post-form" onSubmit={(e) => handlePost(e)}>
        <div className="person-detail-flex" style={{paddingBottom : "0.5em"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={userInfo.oauth_login ? userInfo.user_pfp : `${serverLocation}/api/media/${userInfo.user_pfp}`} referrerPolicy="no-referrer" alt=""/>}
          </div>
          <textarea maxLength="500" name="text" className="post-textbox" placeholder="Post something here!" ref={textBox}></textarea>
        </div>
        
        {uploadImages[0] && <div className="media-attached">
          <div style={{maxWidth: "50ch"}}>Media attached: {uploadImages[0].name}</div>
          <Buttons.DefaultButton theme="blue" contentColor="white" fontSize="0.8rem" handleClick={() => setUploadImages([])}>Clear Media</Buttons.DefaultButton>
        </div>}

        <div className="attach-media">
          <div className="attach-icons">
            <Buttons.DefaultButton handleClick={() => openMediaModal("image-modal")} theme="white" width="2.5em" height="2.5em">
              <IconComponents.ImagesIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton handleClick={() => openMediaModal("video-modal")} theme="white" width="2.5em" height="2.5em">
              <IconComponents.VideoIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="white" width="2.5em" height="2.5em">
              <IconComponents.DocumnetIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
          </div>
        </div>

        <AnimatePresence>
          {longLoading &&
            <motion.div style={{fontSize: "0.8rem", color: "lightslategray", textAlign: "center"}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
            >
              This may take a while...
            </motion.div>
          }
        </AnimatePresence>
        <div style={{display: "flex", justifyContent: "center"}}>
          
          <Buttons.DefaultButton isLoading={isPosting} submit={true} contentColor="white" width="60%" height="2.5em" fontSize="0.8rem">
            Post
          </Buttons.DefaultButton>
        </div>
      </form>
    </div>
  )
}