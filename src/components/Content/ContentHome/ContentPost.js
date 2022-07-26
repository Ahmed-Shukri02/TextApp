import React, {useState, useEffect} from "react";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";
import Buttons from "../../Buttons/Buttons";
import Inputs from "../../Inputs/Inputs";
import { useSyncExternalStore } from "react";

export default function ContentPost({postInfo, userInfo, /* AddReply, AddReplyTo, AddReplyLike, handleCloseComments, toggleSubCommentBox, handlerToggleSubComments */}){

  const [images, setImages] = useState(null);
  const [likes, setLikes] = useState(postInfo.post_likes);
  const [isLiked, setLikedStatus] = useState(false);
  const [replies, setReplies] = useState(null)

  /* postInfo.likes = likes; */

  /*
  =============================================================
    COMMENT FEATURES
  =============================================================
  */

  // comments
  async function handleLike(){
    
    try{
      let liker = JSON.stringify({liker: userInfo.user_id})
      console.log(isLiked)
      
      // check liked status
      if(isLiked){
        //unlike the post
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}?method=unlike`, {
          method: "PUT", 
          headers:{"Content-Type" : "application/json"},
          body: liker
        })

        let likesValue = await likes.json()
        console.log(likesValue)
        
        let likes_users = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`, {
          method: "DELETE",
          headers:{"Content-Type" : "application/json"},
          body: liker
        })

        likes_users = await likes_users.json()
        console.log(likes_users)

        setLikes((oldVal) => oldVal - 1)

      }

      else{
        // like the post
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}?method=like`, {
          method: "PUT", 
          headers:{"Content-Type" : "application/json"},
          body: liker
        })

        let likesValue = await likes.json()
        console.log(likesValue)

        let likes_users = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`, {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: liker
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

  /*
  function handleReply(replyInfo){
    replyInfo = {...replyInfo, key: 0, parentKey: 0}
    AddReply(postInfo.key, replyInfo)
  }
  
  // sub comments
  function handleReplyLike(info, isLiked){
    AddReplyLike(info, postInfo.key, isLiked);
  }

  function handleReplyTo(replyInfo){
    let index = postInfo.replies[replyInfo.parentKey].repliesTo.length
    replyInfo = {...replyInfo, key: index}

    AddReplyTo(postInfo.key, replyInfo)
  }

  function postCloseSubCommentBox(){
    handleCloseComments(postInfo.key)
  }

  function toggleSubComment(replyInfo, open){
    if(!replyInfo.commentBox) {postCloseSubCommentBox()}
    toggleSubCommentBox(replyInfo, postInfo.key, open)
  }

  function postToggleSubComments(replyInfo, open){
    handlerToggleSubComments(postInfo.key, replyInfo, open)
  }  */

  /*
  =============================================================
    HANDLE STOCK IMAGES
  =============================================================
  */
  
  // grab random images from picsum
  async function LoadData(){
    let response = await fetch('https://picsum.photos/v2/list')
    let responseJSON = await response.json();

    setImages(responseJSON);

    return;
  }
  
  useEffect(() =>{
    
    async function fetchData(){
      // make get request for this posts likes
      try{
        let likes = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/likes`)
  
        let likesArray = await likes.json()
  
        console.log(likesArray)
        setLikedStatus(likesArray.includes(userInfo.user_id))

        let replies = await fetch(`http://localhost:5000/api/posts/${postInfo.post_id}/replies`)
        replies = await replies.json()

        console.log(replies)
        setReplies(replies)
        
      }
      catch(err){
        console.log(err)
      }
  
    }

    fetchData()
    LoadData();
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
  
  const repliesJSX = replies && replies.map(elem => <Reply info={elem} userInfo ={userInfo} key={elem.reply_id} loadedImages = {loadedImages} /* handleLike = {handleReplyLike} handleReplyTo = {handleReplyTo} toggleSubComment = {toggleSubComment} postToggleSubComments={postToggleSubComments} *//>); 

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

    
    /* function seeMore(num){
      // check if comments + 2 is larger than the available comments. If so, set the commentslength to max available comments
      let newVal = commentsLength + num > postInfo.replies.length ? postInfo.replies.length : commentsLength + num;
      setCommentsLength(newVal)
    }

    function seeNmore(e){
      e.preventDefault()

      let input = e.target.querySelector("input");
      if(!input.value) return;

      seeMore(parseInt(input.value))
      
      input.value = ""
    } */

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

        {isCommenting && <ContentComment loadedImages = {loadedImages} /* handleReply ={handleReply} replyToStats = {replyStats} closeReply={() => ""} */ />}

          {replies.length > 0 &&
          <div className="replies">
            <div className="most-relevant">Most relevant  <IconComponents.ExpandDownIcon/></div>
            {/* {repliesJSX.slice(0, commentsLength)} */}
            {repliesJSX}

            <div className="comments-displaying"> 
              Displaying <span>{replies.length} out of {replies.length}</span> comments
            </div>

            {/* <div className="see-more-container">
              <div className="see-more-less">
                {commentsLength < postInfo.replies.length && <Buttons.DefaultButton width="7em" handleClick={() => seeMore(2)} fontSize="0.8rem" contentColor="white"> See more </Buttons.DefaultButton>}
                {commentsLength > 1 && <Buttons.DefaultButton width="7em"  handleClick={() => setCommentsLength(1)} fontSize="0.8rem" contentColor="white"> Collapse </Buttons.DefaultButton>}
              </div>
              <div className="see-n-more">
                {commentsLength < postInfo.replies.length && (
                  <div style={{display: "flex", flexDirection: "row", gap: "0.5em", alignItems: "center"}}>
                    <span>See # more: </span>
                    <form onSubmit={seeNmore}>
                      <Inputs.Number />
                      <Buttons.DefaultButton width="3em" height="2em" fontSize="0.8rem" contentColor="white"> # </Buttons.DefaultButton>
                    </form>
                  </div>
                )}
              </div>
            </div> */}

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