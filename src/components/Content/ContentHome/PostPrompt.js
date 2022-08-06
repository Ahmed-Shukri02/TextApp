import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { StockImages } from "../../../Contexts/StockImages";
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";

export default function PostPrompt({posts, userInfo, setPosts}){

  const {images, loadedImages} = useContext(StockImages)
  const textBox = useRef(null)
  const textContainer = useRef(null)

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
    
    let {text} = e.target.elements
    
    try{
      let newPosts = await fetch(`http://localhost:5000/api/users/user_posts`, {
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
      setPosts(finalPosts)
    }
    catch(err){
      console.log(err)
    }
  }

  return(
    <div className="post-prompt" ref={textContainer}>
      <form className="post-form" onSubmit={(e) => handlePost(e)}>
        <div className="person-detail-flex" style={{paddingBottom : "0.5em"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={`http://localhost:5000/${userInfo.user_pfp}`} alt=""/>}
          </div>
          <textarea maxLength="500" name="text" className="post-textbox" placeholder="Post something here!" ref={textBox}></textarea>
        </div>
        
        <div className="attach-media">
          <Buttons.DefaultButton theme="white" width="2.5em" height="2.5em">
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
          <Buttons.DefaultButton submit={true} contentColor="white" width="60%" height="2.5em" fontSize="0.8rem">
            Post
          </Buttons.DefaultButton>
        </div>
      </form>
    </div>
  )
}