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

export default function ContentPost({postInfo, userInfo, index, removeIndex, fromFeed = false, feedHandleNameClick}){

  const {images} = useContext(StockImages)
  const [likes, setLikes] = useState(postInfo.post_likes);
  const [isLiked, setLikedStatus] = useState(false);
  const [clientOwns, setClientOwns] = useState(false)
  const [replies, setReplies] = useState(null)
  const [media, setMedia] = useState([])
  const [showReply, setShowReply] = useState(false)
  const [commentBoxReference, setCommentBoxReference] = useState(null)
  const [isCommenting, setCommentingStatus] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  const thisPost = useRef()
  
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)

  //console.log(media)

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
      setLikeLoading(true)
      // check liked status
      if(isLiked){
        //unlike the post
        let likes = await fetch(` /api/posts/${postInfo.post_id}?method=unlike`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
          },
        })

        let likesValue = await likes.json()
        
        let likes_users = await fetch(` /api/posts/${postInfo.post_id}/likes`, {
          method: "DELETE",
          headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
          },
        })

        likes_users = await likes_users.json()

        setLikes((oldVal) => oldVal - 1)

      }

      else{
        // like the post
        let likes = await fetch(` /api/posts/${postInfo.post_id}?method=like`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
          },
        })

        let likesValue = await likes.json()

        let likes_users = await fetch(` /api/posts/${postInfo.post_id}/likes`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
          },
        })

        likes_users = await likes_users.json()
        setLikes((oldVal) => oldVal + 1)

      }

      setLikedStatus((oldVal) => !oldVal);
      setLikeLoading(false)
      setTimeout(() => {
      }, 2000);
      return
    }
    catch(err){
      console.log(err, err.line)
    }
    
  }

  
  async function handleReply(reply_text){
    try{
      let replyJson = JSON.stringify({text: reply_text.replace("'", "''")})

      let newRow = await fetch(` /api/posts/${postInfo.post_id}/replies?type=reply`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
        },
        body : replyJson
      })

      let newRowJson = await newRow.json()

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
    if(fromFeed){
      feedHandleNameClick(userInfo)
    }
    else{
      let name = e.target.innerText
      window.location.href = `/users/${name}/home`
      return
    }
    
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
            "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
          }
        })
        let likesObj = await likes.json()
  
        setLikedStatus(likesObj.client_like_status)

        let replies = await fetch(` /api/posts/${postInfo.post_id}/replies`, {
          method: "GET",
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("userToken")}`
          }
        })
        replies = await replies.json()

        setReplies(replies)
        //console.log(replies)

        let media = await fetch(`/api/media/${postInfo.post_id}/uploads`, {method: "GET"})
        let mediaJson = await media.json()
        setMedia(mediaJson)
        
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
  
  const repliesJSX = replies && replies.map((elem, index)=> <Reply index={index} removeReply={popRepliesAtIndex} info={elem} userInfo ={userInfo} key={elem.reply_id} loadedImages = {loadedImages} commentBoxReference={commentBoxReference} toggleCommentBox={handleCommentingToReply} postInfo = {postInfo}/>);

  const mediaJSX = media.map((elem, index) => 
    elem.media_type === "image" ?
    <img className="media" src={`/api/media/${elem.media}`} alt={"single 5"}/>:
    <video controls className="media">
      <source src={`/api/media/${elem.media}`} type="video/mp4"/>
      Sorry, your browser does not support this video format
    </video>
  )

  // COMPONENT
  function personDetails(){
    return (
      <div data-testid="person-detail-flex" className="person-detail-flex" ref={thisPost}>
        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={userInfo.oauth_login ? userInfo.user_pfp : `/api/media/${userInfo.user_pfp}`} referrerPolicy="no-referrer" alt=""/>}
          </div>
          <div className="person-detail-info">
            <Buttons.UnderlineButton handleClick={navigateToUser} addStyle="no-padding">
              <div className="post-author">{userInfo.username} {userInfo.is_verified && <IconComponents.Checkmark/>} </div>
            </Buttons.UnderlineButton>
            <div className="post-time">{postInfo.post_time}</div>
          </div>
        </div>
        <div data-testid="delete-options" className="deleteOptions">
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
        {mediaJSX && mediaJSX[0]}
      </div>
    )
  }

  // COMPONENT

  function Interaction(){
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

    const buttonStyle= {
      theme:"white",
      fontSize:"0.9rem",
      contentColor:"lightslategray",
      minWidth:"3em"
    }

    return (
      replies && // ONLY LOAD WHEN REPLIES HAVE LOADED
      <div className="post-interaction">
        <div className="interaction-prompt">
          <div className="interaction-prompt-left">
            { isLiked ?
            <Buttons.DefaultButton {...buttonStyle} handleClick={handleLike} isLoading={likeLoading}><IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> {likes} </Buttons.DefaultButton> :
            <Buttons.DefaultButton handleClick={handleLike} {...buttonStyle} isLoading={likeLoading}><IconComponents.ThumbUpIcon/> {likes} </Buttons.DefaultButton>
            }
            <Buttons.DefaultButton testid="chat-button" {...buttonStyle} handleClick={handleComment}><IconComponents.ChatBubbleIcon/> {replies.length} </Buttons.DefaultButton>

            <Buttons.DefaultButton {...buttonStyle}><IconComponents.ArrowIcon/> 0 </Buttons.DefaultButton>
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

        {isCommenting && <ContentComment loadedImages = {loadedImages} handleReply ={handleReply}/>}

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

  //console.log(replies)

  return (
    <div className="content-post">
      {personDetails()}
      {post()}
      {Interaction()}
    </div>
  )
}