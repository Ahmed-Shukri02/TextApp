import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { StockImages } from "../../../Contexts/StockImages";
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";
import {MediaContext} from "../../../Contexts/MediaContext"

import { useSelector, useDispatch } from "react-redux";
import { setModalStatus } from "../../../Tools/modalStatus";
import Modal from "../../Modals/Modal";

export default function PostPrompt({posts, userInfo, setPosts}){

  const {images, loadedImages} = useContext(StockImages)
  const {isTablet} = useContext(MediaContext)
  const textBox = useRef(null)
  const textContainer = useRef(null)
  const [isPosting, setIsPosting] = useState(false)
  const [uploadImages, setUploadImages] = useState([])

  const dispatch = useDispatch()
  const modalStatus = useSelector((state) => state.modalStatus.value)
  console.log(modalStatus)
  
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
  
  async function handlePost(e){
    e.preventDefault()
    if(!e.target.elements["text"].value){
      console.log("empty message")
      return;
    }
    
    setIsPosting(true)
    let {text} = e.target.elements
    
    try{
      let newPosts = await fetch(` /api/users/user_posts`, {
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

      console.log(finalPosts)

      console.log(uploadImages.length)
      if(uploadImages.length){
        const imagesForm = new FormData();
        imagesForm.append("image", uploadImages[0])
  
        let res = await fetch(`/api/media/${newPostsJson[0].post_id}/uploads?type=image`, {
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
    }
    catch(err){
      console.log(err)
    }
  }

  function addMedia(e){
    e.preventDefault()
    let image = e.target.elements["image"].files[0]
    console.log(image)

    if(image) setUploadImages([image])
    
    dispatch(setModalStatus(false))
  }

  return(
    <div className="post-prompt" ref={textContainer}>
      <Modal>
        <div className="media-modal">
          <h1 className="media-modal-title"> Upload your image here </h1>
          <div className="media-modal-flex">
            <form onSubmit={addMedia} className="media-modal-left">
              <input type="file" name="image"/>
              <div style={{marginTop: "1em"}}><Buttons.DefaultButton contentColor="white" height="2em" width="7em" submit={true}>Submit</Buttons.DefaultButton></div>
            </form>
            {! isTablet && <div className="media-modal-right">
              <h3 style={{textAlign: "center"}}> This is how your post will look like </h3>
            </div>}
          </div>
        </div>
      </Modal>
      
      <form className="post-form" onSubmit={(e) => handlePost(e)}>
        <div className="person-detail-flex" style={{paddingBottom : "0.5em"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={userInfo.oauth_login ? userInfo.user_pfp : `/api/media/${userInfo.user_pfp}`} referrerPolicy="no-referrer" alt=""/>}
          </div>
          <textarea maxLength="500" name="text" className="post-textbox" placeholder="Post something here!" ref={textBox}></textarea>
        </div>
        
        {uploadImages[0] && <div>
          Media attached: {uploadImages[0].name}
        </div>}

        <div className="attach-media">
          <Buttons.DefaultButton handleClick={() => dispatch(setModalStatus(true))} theme="white" width="2.5em" height="2.5em">
              <IconComponents.AttachIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
        
          <div className="attach-icons">
            <Buttons.DefaultButton theme="white" width="2.5em" height="2.5em">
              <IconComponents.ImagesIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="white" width="2.5em" height="2.5em">
              <IconComponents.VideoIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="white" width="2.5em" height="2.5em">
              <IconComponents.DocumnetIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
          </div>
        </div>

        <div style={{display: "flex", justifyContent: "center"}}>
          <Buttons.DefaultButton isLoading={isPosting} submit={true} contentColor="white" width="60%" height="2.5em" fontSize="0.8rem">
            Post
          </Buttons.DefaultButton>
        </div>
      </form>
    </div>
  )
}