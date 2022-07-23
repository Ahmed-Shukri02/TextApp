import React from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";

export default function SubReply({info, loadedImages, handleLike, handleSubcomment, toggleSubComment, parentInfo, replySeeLess}){

  function LikeReply(){
    handleLike(info, info.userLike)
  }

  function ToggleReplyTo(){
    toggleSubComment(info);
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
  
  return (
    <div className="reply-container">
      <div className="reply" key={info.key}>
        <div className="reply-profile-img">{loadedImages(info.pfp)}</div>
        <div>
          <div className="reply-to"><IconComponents.ReturnUpForwardIcon/> <span style={{fontWeight: "bold"}}>{info.toInfo.author}</span>: {info.toInfo.content}</div>
          
          <div className="reply-profile-content">
            <div className="reply-profile-name">{info.author}</div>
            <div className="reply-profile-reply">{info.content}</div>
          </div>
          <div className="reply-stats">
            <div className="reply-time">{info.time}</div>
            <div className="reply-likes" onClick={LikeReply}>
              {info.userLike ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {info.likes}
            </div>
            <Buttons.DefaultButton handleClick={ToggleReplyTo} theme="white" fontSize="0.8rem" contentColor="lightslategray"> Reply</Buttons.DefaultButton>
          </div>
        </div>
      </div>

      {info.commentBox && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} replyToStats = {replyToStats} closeReply={ToggleReplyTo}/>}

      {(info.key + 1) === parentInfo.repliesTo.length &&
        <Buttons.UnderlineButton handleClick={() => replySeeLess()} theme="white" fontSize="0.9rem" contentColor="lightslategray">
          <div className="see-sub-replies">See less</div>
      </Buttons.UnderlineButton>
      }
    </div>
  )
}