import React, { useEffect, useState } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import SubReply from "./ContentSubReply";
import Buttons from "../../Buttons/Buttons";

export default function Reply({info, userInfo, loadedImages, /* handleLike, handleReplyTo, toggleSubComment, postToggleSubComments */}){
  
  const [replyAuthorInfo, setReplyAuthorInfo] = useState(null)
  const [replyLikeList, setReplyLikeList] = useState(null)

  /* function LikeReply(){
    handleLike(info, info.userLike)
  }

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
  }
  
  const renderCondition = (info.type === "comment" && info.repliesTo.length > 0 && info.isViewingSubs)
  var repliesToJSX
  if(renderCondition){
    repliesToJSX = info.repliesTo.map((elem) =>
      <div className="sub-replies" key={elem.key}>
        <SubReply info={elem} key={elem.key} loadedImages={loadedImages} handleSubcomment = {handleSubcomment} handleLike={LikeSubReply} toggleSubComment={ToggleSubReply} parentInfo={info} replySeeLess={replySeeLess}/>
      </div>
    )

  } */

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
  
      }
      catch(err){
        console.log(err)
      }
    }

    getReplyInfo()
    getReplyLikes()

  }, [])



  return (
    (replyAuthorInfo && replyLikeList) && // RETURNS WHEN FETCHING AUTHOR INFO IS COMPLETE
    <div className="reply-container">
      <div className="reply">
        <div className="reply-profile-img">{loadedImages(userInfo.stock_pfp)}</div>
        <div>
          <div className="reply-profile-content">
            <div className="reply-profile-name">{replyAuthorInfo.username}</div>
            <div className="reply-profile-reply">{info.reply_text}</div>
          </div>
          <div className="reply-stats">
            <div className="reply-time">{info.reply_time}</div>
            <div className="reply-likes" /* onClick={LikeReply} */>
              {replyLikeList.includes(userInfo.user_id) ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {info.likes}
            </div>

            <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray"> Reply</Buttons.DefaultButton>
          </div>
          {
            (info.subreplies.length > 0 /* && !info.commentBox && !info.isViewingSubs */) && 
            <Buttons.UnderlineButton theme="white" fontSize="0.9rem" contentColor="lightslategray">
              <div className="see-sub-replies">
                <IconComponents.ReturnbDownForwardIcon/> 
                <div> see <span style={{fontWeight: "bold"}}>{info.subreplies.length}</span> {info.subreplies.length > 1 ? "replies" : "reply"}</div>
              </div>
            </Buttons.UnderlineButton>
          }

        </div>
      </div>

      {/* {info.commentBox && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} replyToStats = {replyToStats} closeReply={ToggleReplyTo}/>}

      {renderCondition && <div className="sub-replies-container">{repliesToJSX}</div>} */}
    
    </div>
    
  )
}