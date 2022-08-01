import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { StockImages } from "../../../Contexts/StockImages";
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";
import ContentPost from "./ContentPost";
import Posts from "./posts.json"

export default function ContentRight({userInfo, token}){
  
  const [posts, setPosts] = useState([])
  const {images, loadedImages} = useContext(StockImages)
  const textBox = useRef(null)
  const textContainer = useRef(null)


  useEffect(() =>{
    // do get request for users posts
    async function getPosts(){
      try{
        let posts = await fetch(`http://localhost:5000/api/posts?author_id=${userInfo.user_id}`, {
          method: "GET",
          headers: {"Authorization" : `Bearer ${token}`}
        })

        let postsJson = await posts.json()
        console.log(postsJson)
        setPosts(postsJson)
      }
      catch(err){
        console.log(err)
      }
    }
    
    getPosts()

    // get height of container as 70% of this will be the max height of textbox
    let maxHeight = 0.7  * parseInt(window.getComputedStyle(textContainer.current).height)

    // add event listener to ref object
    textBox.current.style.height = "5em"
    textBox.current.addEventListener("input", () => {
      let fontSize = parseInt(window.getComputedStyle(textBox.current).fontSize)

      console.log(textBox.current.scrollHeight, (fontSize * 5))
      console.log(`chose ${textBox.current.scrollHeight < (fontSize * 5) ? `5em` : textBox.current.scrollHeight + "px"} `)
      
      textBox.current.style.height = "auto";
      textBox.current.style.height = textBox.current.scrollHeight < (fontSize * 5) ? `5em` : textBox.current.scrollHeight + "px"
      textBox.current.style.overflowY = "hidden"
    })
  }, [])
  
  const postsJSX = posts.map(elem => <ContentPost postInfo={elem} userInfo={userInfo} key={elem.post_id} token={token}/>)

  function personDetails(){
    return (
      <form className="post-form">
        <div className="person-detail-flex" style={{paddingBottom : "0.5em"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img src={userInfo.user_pfp} alt=""/>}
          </div>
          <textarea maxLength="500" className="post-textbox" placeholder="Post something here!" ref={textBox}></textarea>
        </div>
        
        <div className="attach-media">
          <Buttons.DefaultButton theme="white">
              <IconComponents.AttachIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
        
          <div className="attach-icons">
            <Buttons.DefaultButton theme="white">
              <IconComponents.ImagesIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="white">
              <IconComponents.VideoIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="white">
              <IconComponents.DocumnetIcon iconClass="attach-icon"/>
            </Buttons.DefaultButton>
          </div>
        </div>

        <div style={{display: "flex", justifyContent: "center"}}>
          <Buttons.DefaultButton submit={false} contentColor="white" width="60%" height="2.5em" fontSize="0.8rem">
            Post
          </Buttons.DefaultButton>
        </div>
      </form>
    )
  }

  return (
    <div className="content-home-right">
      <div className="post-prompt" ref={textContainer}>
        {personDetails()}
      </div>
      {postsJSX}
    </div>
  )
}