import React, {useState, useEffect, useContext, useRef} from "react";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";
import Buttons from "../../Buttons/Buttons";
import Inputs from "../../Inputs/Inputs";
import { StockImages } from "../../../Contexts/StockImages";
import { useNavigate } from "react-router-dom";
import "../Content.css"
import e from "cors";
import { useSelector } from "react-redux";

export default function ContentPost({postInfo, userInfo, token, index, removeIndex}){

  const {images} = useContext(StockImages)
  const [likes, setLikes] = useState(postInfo.post_likes);
  const [isLiked, setLikedStatus] = useState(false);
  const [clientOwns, setClientOwns] = useState(false)
  const [replies, setReplies] = useState(null)
  const [showReply, setShowReply] = useState(false)
  const [commentBoxReference, setCommentBoxReference] = useState(null)
  const [isCommenting, setCommentingStatus] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const thisPost = useRef()
  
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)


  /*
  =============================================================
    COMMENT FEATURES
  =============================================================
  */

  // comments
  async function handleLike(){
    // check if user is logged in, if not, prompt user to log in
    if(!client){
      window.location.href = "/login"
      return
    }

    try{
      console.log(isLiked)
      
      // check liked status
      if(isLiked){
        //unlike the post
        let likes = await fetch(` /api/posts/${postInfo.post_id}?method=unlike`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          },
        })

        let likesValue = await likes.json()
        console.log(likesValue)
        
        let likes_users = await fetch(` /api/posts/${postInfo.post_id}/likes`, {
          method: "DELETE",
          headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
        })

        likes_users = await likes_users.json()
        console.log(likes_users)

        setLikes((oldVal) => oldVal - 1)

      }

      else{
        // like the post
        let likes = await fetch(` /api/posts/${postInfo.post_id}?method=like`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          },
        })

        let likesValue = await likes.json()
        console.log(likesValue)

        let likes_users = await fetch(` /api/posts/${postInfo.post_id}/likes`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
        })

        likes_users = await likes_users.json()
        console.log(likes_users)

        setLikes((oldVal) => oldVal + 1)

      }

      setLikedStatus((oldVal) => !oldVal);
      return
    }
    catch(err){
      console.log(err, err.line)
    }
    
  }

  
  async function handleReply(reply_text){
    try{
      let replyJson = JSON.stringify({text: reply_text})

      let newRow = await fetch(` /api/posts/${postInfo.post_id}/replies?type=reply`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body : replyJson
      })

      let newRowJson = await newRow.json()
      console.log(newRowJson)

      let repliesCopy = [...replies]
      repliesCopy.unshift(newRowJson)
      setReplies(repliesCopy)
      setCommentingStatus(false)
      setShowReply(true)
    }
    catch(err){
      console.log(err)
    }

  }

  function navigateToUser(e){
    let name = e.target.innerText
    window.location.href = `/users/${name}/home`
    return
  }
  
  function handleCommentingToReply(reply_id){
    if(commentBoxReference === reply_id){
      setCommentBoxReference(null)
    }
    else{
      setCommentBoxReference(reply_id)
    }
  }

  async function deletePost(){
    let res = await fetch(`/api/posts/${postInfo.post_id}`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`},
    })

    if(res.status === 200){
      removeIndex(index)
    }
  }

  function popRepliesAtIndex(index){
    let repliesCopy = [...replies]
    repliesCopy.splice(index, 1)

    setReplies(repliesCopy)
  }
  
  useEffect(() =>{
    
    async function fetchData(){
      // make get request for this posts likes
      try{
        let likes = await fetch(` /api/posts/${postInfo.post_id}/likes`, {
          method : "GET",
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
  
        let likesObj = await likes.json()
  
        setLikedStatus(likesObj.client_like_status)

        let replies = await fetch(` /api/posts/${postInfo.post_id}/replies`, {
          method: "GET",
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
        replies = await replies.json()
        //console.log(replies)
        setReplies(replies)
        
      }
      catch(err){
        console.log(err)
      }
  
    }

    fetchData()
    setClientOwns(client &&  client.user_id === postInfo.post_author_id)

    thisPost.current.addEventListener("mouseenter", () => setIsHovering(true))
    thisPost.current.addEventListener("mouseleave", () => setIsHovering(false))

    return () => {
      if(thisPost.current){
        thisPost.current.removeEventListener("mouseenter", () => setIsHovering(true))
        thisPost.current.removeEventListener("mouseleave", () => setIsHovering(false))
      }
    }

  }, [])
  
  function loadedImages(num){
    return images ?
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }

  /*
  =============================================================
    COMPONENTS
  =============================================================
  */
  
  const repliesJSX = replies && replies.map((elem, index)=> <Reply index={index} removeReply={popRepliesAtIndex} info={elem} userInfo ={userInfo} key={elem.reply_id} loadedImages = {loadedImages} commentBoxReference={commentBoxReference} toggleCommentBox={handleCommentingToReply} postInfo = {postInfo} token={token}/>); 

  // COMPONENT
  function personDetails(){
    return (
      <div className="person-detail-flex" ref={thisPost}>
        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={` /${userInfo.user_pfp}`} alt=""/>}
          </div>
          <div className="person-detail-info">
            <Buttons.UnderlineButton handleClick={navigateToUser} addStyle="no-padding">
              <div className="post-author">{userInfo.username} {userInfo.is_verified && <IconComponents.Checkmark/>} </div>
            </Buttons.UnderlineButton>
            <div className="post-time">{postInfo.post_time}</div>
          </div>
        </div>
        <div className="deleteOptions">
          {(clientOwns && isHovering) &&<Buttons.DefaultButton theme="white" handleClick={() => deletePost()}><IconComponents.TrashIcon iconClass="delete-icon"/></Buttons.DefaultButton> }
        </div>
      </div>
    )
  }

  // COMPONENT
  function post(){
    return (
      <div className="post">
        {postInfo.post_text && <div className="post-content">{postInfo.post_text}</div>}
        {postInfo.post_media && loadedImages(userInfo.stock_pfp)}
      </div>
    )
  }

  // COMPONENT

  function interaction(){
    const [commentsLength, setCommentsLength] = useState(1)
    
    async function handleComment(e){
      // check if user is logged in, if not, prompt user to log in
      if(!client){
        window.location.href = "/login"
        return
      }
      
      setCommentingStatus((oldVal) => !oldVal)
    }
    
    function seeMore(num){
      // check if comments + 2 is larger than the available comments. If so, set the commentslength to max available comments
      let newVal = commentsLength + num > replies.length ? replies.length : commentsLength + num;
      setCommentsLength(newVal)
    }

    function seeNmore(e){
      e.preventDefault()

      let input = e.target.querySelector("input");
      if(!input.value) return;

      seeMore(parseInt(input.value))
      
      input.value = ""
    }

    return (
      replies && // ONLY LOAD WHEN REPLIES HAVE LOADED
      <div className="post-interaction">
        <div className="interaction-prompt">
          <div className="interaction-prompt-left">
            { isLiked ?
            <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> {likes} </div> :
            <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon/> {likes} </div>
            }
            <div className="add-comment" onClick={handleComment}><IconComponents.ChatBubbleIcon/> {replies.length} </div>
            <div className="share"><IconComponents.ArrowIcon/> 0 </div>
          </div>
          <div className="interaction-prompt-right">
            {replies.length > 0 &&
            <Buttons.UnderlineButton handleClick={() => setShowReply((oldVal) => !oldVal)} fontSize="inherit" contentColor="#1B74E4" theme="blue">
              {showReply ?
              <div>Hide Replies</div> :
              <div>Show {replies.length} {replies.length === 1 ? "reply" : "replies"}</div>
              } 
            </Buttons.UnderlineButton>}
          </div>
        </div>

        {isCommenting && <ContentComment loadedImages = {loadedImages} handleReply ={handleReply}  /*replyToStats = {replyStats} closeReply={() => ""} */ />}

          {(replies.length > 0 && showReply) &&
          <div className="replies">
            <div className="most-relevant">
              <div>Replies</div>
              <div style={{display: "flex", alignItems: "center"}}>Most recent  <IconComponents.ExpandDownIcon/></div>
            </div>
            {repliesJSX.slice(0, commentsLength)}

            <div className="comments-displaying"> 
              Displaying <span>{commentsLength} out of {replies.length}</span> comments
            </div>

            <div className="see-more-container">
              <div className="see-more-less">
                {commentsLength < replies.length && <Buttons.DefaultButton width="7em" handleClick={() => seeMore(2)} fontSize="0.8rem" contentColor="white"> See more </Buttons.DefaultButton>}
                {commentsLength > 1 && <Buttons.DefaultButton width="7em"  handleClick={() => setCommentsLength(1)} fontSize="0.8rem" contentColor="white"> Collapse </Buttons.DefaultButton>}
              </div>
              <div className="see-n-more">
                {commentsLength < replies.length && (
                  <div style={{display: "flex", flexDirection: "row", gap: "0.5em", alignItems: "center"}}>
                    <span>See # more: </span>
                    <form onSubmit={seeNmore}>
                      <Inputs.Number />
                      <Buttons.DefaultButton width="3em" height="2em" fontSize="0.8rem" contentColor="white" submit={true}> # </Buttons.DefaultButton>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>
          
        }
        
      </div>
    )
  }

  return (
    <div className="content-post">
      {personDetails()}
      {post()}
      {interaction()}
    </div>
  )
}