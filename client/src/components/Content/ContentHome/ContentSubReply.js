import React, { useState, useEffect, useContext, useRef } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import Buttons from "../../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SubReply({info, userInfo , parentInfo, subreplies, loadedImages, handleLike, commentBoxReference, toggleCommentBox, token, handleSubcomment, index, removeSubreply}){

  const [reference, setReference] = useState(null)
  const [likeList, setLikeList] = useState(null)
  const [isLiked, setLikedStatus] = useState(null)
  const [likes, setLikes] = useState(info.subreply_likes)

  const [isHovering, setIsHovering] = useState(false)
  const [clientOwns, setClientOwns] = useState(false)

  const thisSubreply = useRef()
  
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)

  async function handleReplyClick(){
    // check if user is logged in, if not, prompt user to log in
    if(!client){
      window.location.href = "/login"
      return
    }

    toggleCommentBox(info.subreply_id)
  }

  async function handleDeleteSubreply(){
    let res = await fetch(`/api/posts/replies/${info.subreply_id}?type=subreply`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
    })

    if(res.status === 200){
      removeSubreply(index)
    }
  }

  useEffect(() => {
    async function getReference(){
      if(info.reference_type === "subcomment"){
        // get subreply info by searching parentInfo's subreply list
        for(let subreply of subreplies){
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
        let subreplyLikesList = await fetch(` /api/posts/${info.subreply_id}/likes?type=subreply`, {
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        
        let subreplyLikesListJson = await subreplyLikesList.json()

        setLikeList(subreplyLikesListJson)
        setLikedStatus(subreplyLikesListJson.client_like_status? subreplyLikesListJson.client_like_status : false)
  
      }
      catch(err){
        console.log(err)
      }
    }
    
    getSubreplyLikes()
    getReference()
    setClientOwns(client && client.user_id === info.subreply_author_id)

  }, [])

  useEffect(() => {
    if(thisSubreply.current){
      thisSubreply.current.addEventListener("mouseenter", () => setIsHovering(true))
      thisSubreply.current.addEventListener("mouseleave", () => setIsHovering(false))
    }

    return () => {
      if(thisSubreply.current){
        thisSubreply.current.removeEventListener("mouseenter", () => setIsHovering(true))
        thisSubreply.current.removeEventListener("mouseleave", () => setIsHovering(false))
      }
    }

  }, [thisSubreply.current])

  async function handleSubcommentLike(){
    // check if user is logged in, if not, prompt user to log in
    if(!client){
      window.location.href = "/login"
      return
    }
    
    handleLike(info, "subreply", isLiked)
    isLiked ? setLikes(oldVal => (oldVal - 1)) : setLikes(oldVal => (oldVal + 1))
    
    setLikedStatus(oldVal => !oldVal)
  }

  const renderCondition = (reference != null && likeList != null && isLiked != null)

  return (
    renderCondition &&
    <div className="reply-container">
      <div className="reply" ref={thisSubreply}>
        <div style={{display: "flex", gap: "0.5em", alignItems: "flex-start"}}>
          <div className="reply-profile-img">{loadedImages(info.stock_pfp)}</div>
          <div>
            {
              info.subreply_reference_id &&
              <div className="reply-to"><IconComponents.ReturnUpForwardIcon/> <span style={{fontWeight: "bold"}}>{reference.username}</span>: {info.reference_type === "comment" ? reference.reply_text : reference.subreply_text.length > 20 ? `${reference.subreply_text.slice(0, 20)}...` : reference.subreply_text}</div>
            }
          
            <div className="reply-profile-content">
              <div className="reply-profile-name">{info.username}</div>
              <div className="reply-profile-reply">{info.subreply_text}</div>
            </div>
            <div className="reply-stats">
              <div className="reply-time">{info.subreply_time.slice(0, 10)}</div>
              <div className="reply-likes" onClick={() => handleSubcommentLike()}>
                {isLiked ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {likes}
              </div>
              <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => handleReplyClick()}> Reply</Buttons.DefaultButton>
            </div>
          </div>
        </div>

        {(clientOwns && isHovering) && <Buttons.DefaultButton theme="white" handleClick={() => handleDeleteSubreply()}><IconComponents.TrashIcon iconClass="delete-icon"/></Buttons.DefaultButton>}
      </div>

      {info.subreply_id === commentBoxReference && <ContentComment loadedImages = {loadedImages} handleReply = {(text) => handleSubcomment(info, text, "subreply", info.subreply_id)} isReplying={true} replyTo={info} type="subcomment"/>}

    </div>
  )
}