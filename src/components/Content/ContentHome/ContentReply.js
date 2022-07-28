import React, { useEffect, useState } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import SubReply from "./ContentSubReply";
import Buttons from "../../Buttons/Buttons";

export default function Reply({info, userInfo, postInfo, loadedImages, commentBoxReference, toggleCommentBox /*handleReplyTo, toggleSubComment, postToggleSubComments */}){
  
  const [replyAuthorInfo, setReplyAuthorInfo] = useState(null)
  const [replyLikeList, setReplyLikeList] = useState(null)
  const [isLiked, setLikedStatus] = useState(null)
  const [likes, setLikes] = useState(info.reply_likes)
  const [subrepliesOpen, setSubrepliesOpen] = useState(false)

  async function LikeReply(info, type, likeStatus){
    let client = JSON.stringify({liker: userInfo.user_id})
    if(!likeStatus){
      // make put request to increment likes by one
      await fetch(`http://localhost:5000/api/posts/replies/${type == "reply" ? info.reply_id : info.subreply_id}?type=${type}&method=like`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body: client
      })
      // make post request to add to likes list
      let likers = await fetch(`http://localhost:5000/api/posts/replies/${type == "reply" ? info.reply_id : info.subreply_id}?type=${type}`, {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body: client
      })

      console.log(likers)
      // set isliked state to true here if the type is a reply
      if(type === "reply"){
        setLikedStatus(true)
        setLikes((oldVal) => oldVal + 1)
      }
      return
    }
    else{
      // make put request to decrement likes by one
      await fetch(`http://localhost:5000/api/posts/replies/${type == "reply" ? info.reply_id : info.subreply_id}?type=${type}&method=unlike`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body: client
      })
      // make delete request to remove from likes list
      let likers = await fetch(`http://localhost:5000/api/posts/replies/${type == "reply" ? info.reply_id : info.subreply_id}?type=${type}`, {
        method: "DELETE",
        headers : {"Content-Type" : "application/json"},
        body: client
      })
      console.log(likers)
      // set isliked to false here if the type is a reply
      if(type === "reply"){
        setLikedStatus(false)
        setLikes((oldVal) => oldVal - 1)
      }
      return
    }


  }

  function handleSubcomment(){
    return;
  }

  function handleSubrepliesOpen(){

  }

  /*
  function LikeSubReply(info, isLiked){
    handleLike(info, isLiked)
  }

  function ToggleReplyTo(){
    toggleSubComment(info, !info.commentBox);
  }

  function ToggleSubReply(replyInfo){
    toggleSubComment(replyInfo, !replyInfo.commentBox);
  }

  function handleSubcomment(replyInfo){
    replyInfo = {...replyInfo, key: info.repliesTo.length}
    
    handleReplyTo(replyInfo)
  }

  function openSubComments(){
    postToggleSubComments(info, true)
  }

  function replySeeLess(){
    postToggleSubComments(info, false)
  }

  const replyToStats = {
    isReplying: true,
    commentBox: false,
    userLike: false,
    toInfo: info,
    parentKey: info.parentKey,
    type: "subcomment",
    referenceType: info.type,
    repliesTo : null
  }*/

  
  
  const renderCondition = (info.subreplies.length > 0 && subrepliesOpen)
  var repliesToJSX
  if(renderCondition){
    repliesToJSX = info.subreplies.map((elem) =>
      <div className="sub-replies" key={elem.subreply_id}>
        <SubReply info={elem} userInfo = {userInfo} parentInfo={info} loadedImages={loadedImages} commentBoxReference = {commentBoxReference} toggleCommentBox={toggleCommentBox} handleLike={LikeReply}/* handleSubcomment = {handleSubcomment}  handleLike={LikeSubReply} toggleSubComment={ToggleSubReply} parentInfo={info} replySeeLess={replySeeLess} *//>
      </div>
    )

  }

  useEffect(() => {

    async function getReplyInfo(){
      try{
        let userData = await fetch(`http://localhost:5000/api/users/${info.reply_author_id}?type=id`)
        
        let userDataJson = await userData.json()

        setReplyAuthorInfo(userDataJson)

      }
      catch(err){
        console.log(err)
      }
    }
    
    async function getReplyLikes(){
      try{
        let replyLikesList = await fetch(`http://localhost:5000/api/posts/${info.reply_id}/likes?type=reply`)
        
        let replyLikesListJson = await replyLikesList.json()
  
        setReplyLikeList(replyLikesListJson)
        setLikedStatus(replyLikesListJson.includes(userInfo.user_id))
  
      }
      catch(err){
        console.log(err)
      }
    }

    getReplyInfo()
    getReplyLikes()



  }, [])



  return (
    (replyAuthorInfo && replyLikeList && replyAuthorInfo && isLiked != null) && // RETURNS WHEN FETCHING AUTHOR INFO IS COMPLETE
    <div className="reply-container">
      <div className="reply">
        <div className="reply-profile-img">{loadedImages(info.stock_pfp)}</div>
        <div>
          <div className="reply-profile-content">
            <div className="reply-profile-name">{replyAuthorInfo.username}</div>
            <div className="reply-profile-reply">{info.reply_text}</div>
          </div>
          <div className="reply-stats">
            <div className="reply-time">{info.reply_time}</div>
            <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => LikeReply(info, "reply", isLiked)}>
              {isLiked ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {likes}
            </Buttons.DefaultButton>

            <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => toggleCommentBox(info.reply_id)}> Reply</Buttons.DefaultButton>
          </div>
          {
            (info.subreplies.length > 0 && info.reply_id != commentBoxReference  && !subrepliesOpen) && 
            <Buttons.UnderlineButton theme="white" fontSize="0.9rem" contentColor="lightslategray" handleClick={() =>setSubrepliesOpen(true)}>
              <div className="see-sub-replies">
                <IconComponents.ReturnbDownForwardIcon/> 
                <div> see <span style={{fontWeight: "bold"}}>{info.subreplies.length}</span> {info.subreplies.length > 1 ? "replies" : "reply"}</div>
              </div>
            </Buttons.UnderlineButton>
          }

        </div>
      </div>

      {info.reply_id === commentBoxReference && <ContentComment loadedImages = {loadedImages}  handleReply = {handleSubcomment} isReplying = {true} replyTo={info} type="comment"/*replyToStats = {replyToStats} closeReply={ToggleReplyTo} *//>}

      {renderCondition && <div className="sub-replies-container">{repliesToJSX}</div>}

      {subrepliesOpen &&
        <Buttons.UnderlineButton handleClick={() => setSubrepliesOpen(false)} theme="white" fontSize="0.9rem" contentColor="lightslategray">
          <div className="see-sub-replies">See less</div>
        </Buttons.UnderlineButton>
      }
    
    </div>
    
  )
}