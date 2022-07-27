import React, { useState, useEffect } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";

export default function SubReply({info, userInfo , parentInfo, loadedImages, handleLike, commentBoxReference, toggleCommentBox /* handleSubcomment, toggleSubComment, parentInfo, replySeeLess */}){

  const [reference, setReference] = useState(null)
  const [likeList, setLikeList] = useState(null)
  const [isLiked, setLikedStatus] = useState(null)

  function LikeReply(){
    handleLike(info, info.userLike)
  }

  function handleSubcomment(){
    return
  }
  
  
  useEffect(() => {
    async function getReference(){
      if(info.reference_type === "subcomment"){
        // get subreply info by searching parentInfo's subreply list
        for(let subreply of parentInfo.subreplies){
          if (subreply.subreply_id === info.subreply_reference_id){
            setReference(subreply)
            return
          }
        }
      }
      else if (info.reference_type === "comment"){
        // get reply info from parentInfo{
          setReference(parentInfo)
          return
        }
    }

    async function getSubreplyLikes(){
      try{
        let subreplyLikesList = await fetch(`http://localhost:5000/api/posts/${info.subreply_id}/likes?type=subreply`)
        
        let subreplyLikesListJson = await subreplyLikesList.json()

        setLikeList(subreplyLikesListJson)
        setLikedStatus(subreplyLikesListJson.includes(userInfo.user_id))
  
      }
      catch(err){
        console.log(err)
      }
    }
    
    getSubreplyLikes()
    getReference()

  }, [])

  const renderCondition = (reference != null && likeList != null && isLiked != null)

  return (
    renderCondition &&
    <div className="reply-container">
      <div className="reply">
        <div className="reply-profile-img">{loadedImages(info.stock_pfp)}</div>
        <div>
          <div className="reply-to"><IconComponents.ReturnUpForwardIcon/> <span style={{fontWeight: "bold"}}>{reference.username}</span>: {info.reference_type === "comment" ? reference.reply_text : reference.subreply_text}</div>
          
          <div className="reply-profile-content">
            <div className="reply-profile-name">{info.username}</div>
            <div className="reply-profile-reply">{info.subreply_text}</div>
          </div>
          <div className="reply-stats">
            <div className="reply-time">{info.subreply_time}</div>
            <div className="reply-likes" onClick={LikeReply}>
              {isLiked ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {likeList.length}
            </div>
            <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => toggleCommentBox(info.subreply_id)}> Reply</Buttons.DefaultButton>
          </div>
        </div>
      </div>

      {info.subreply_id === commentBoxReference && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} isReplying={true} replyTo={info} type="subcomment"/>}

    </div>
  )
}