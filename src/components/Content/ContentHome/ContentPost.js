import React, {useState, useEffect, useContext} from "react";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";
import Buttons from "../../Buttons/Buttons";
import Inputs from "../../Inputs/Inputs";
import { StockImages } from "../../../Contexts/StockImages";

export default function ContentPost({postInfo, userInfo, token}){

  const {images} = useContext(StockImages)
  const [likes, setLikes] = useState(postInfo.post_likes);
  const [isLiked, setLikedStatus] = useState(false);
  const [replies, setReplies] = useState(null)
  const [commentBoxReference, setCommentBoxReference] = useState(null)

  /*
  =============================================================
    COMMENT FEATURES
  =============================================================
  */

  // comments
  async function handleLike(){
    
    try{
      console.log(isLiked)
      
      // check liked status
      if(isLiked){
        //unlike the post
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}?method=unlike`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          },
        })

        let likesValue = await likes.json()
        console.log(likesValue)
        
        let likes_users = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`, {
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
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}?method=like`, {
          method: "PUT", 
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          },
        })

        let likesValue = await likes.json()
        console.log(likesValue)

        let likes_users = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`, {
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

      let newRow = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/replies?type=reply`, {
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
    }
    catch(err){
      console.log(err)
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
  
  useEffect(() =>{
    
    async function fetchData(){
      // make get request for this posts likes
      try{
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`, {
          method : "GET",
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
  
        let likesObj = await likes.json()
  
        setLikedStatus(likesObj.client_like_status)

        let replies = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/replies`, {
          method: "GET",
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
        replies = await replies.json()

        console.log(replies)
        //console.log(replies)
        setReplies(replies)
        
      }
      catch(err){
        console.log(err)
      }
  
    }

    fetchData()
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
  
  const repliesJSX = replies && replies.map(elem => <Reply info={elem} userInfo ={userInfo} key={elem.reply_id} loadedImages = {loadedImages} commentBoxReference={commentBoxReference} toggleCommentBox={handleCommentingToReply} postInfo = {postInfo} token={token}/>); 

  // COMPONENT
  function personDetails(){
    return (
      <div className="person-detail-flex">
        <div className="person-detail-image">
          {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img src={userInfo.user_pfp} alt=""/>}
        </div>
        <div className="person-detail-info">
          <div className="post-author">{userInfo.username} {userInfo.is_verified && <IconComponents.Checkmark/>} </div>
          <div className="post-time">{postInfo.post_time}</div>
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
    const [isCommenting, setCommentingStatus] = useState(false, [])
    const [commentsLength, setCommentsLength] = useState(1)
    
    function handleComment(e){
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
        <div className="interaction-stats">
          <div><IconComponents.ThumbUpIcon fill="none"/> {likes} Likes</div>
          <div>{postInfo.post_replies} {postInfo.post_replies === 1 ? "Comment" : "Comments"}  ·  0 Shares</div>
        </div>

        <div className="interaction-prompt">
          { isLiked ?
          <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> Unlike</div> :

          <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon/> Like</div>
          }

          <div className="add-comment" onClick={handleComment}><IconComponents.ChatBubbleIcon/> Comment </div>
          <div className="share"><IconComponents.ArrowIcon/> Share </div>
        </div>

        {isCommenting && <ContentComment loadedImages = {loadedImages} handleReply ={handleReply}  /*replyToStats = {replyStats} closeReply={() => ""} */ />}

          {replies.length > 0 &&
          <div className="replies">
            <div className="most-relevant">Most recent  <IconComponents.ExpandDownIcon/></div>
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