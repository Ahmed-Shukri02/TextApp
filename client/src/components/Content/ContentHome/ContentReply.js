import React, { useContext, useEffect, useRef, useState } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import SubReply from "./ContentSubReply";
import Buttons from "../../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Reply({info, userInfo, postInfo, loadedImages, commentBoxReference, toggleCommentBox, token, index, removeReply}){
  
  const [replyAuthorInfo, setReplyAuthorInfo] = useState(null)
  const [subreplies, setSubreplies] = useState(null)
  const [replyLikeList, setReplyLikeList] = useState(null)
  const [isLiked, setLikedStatus] = useState(null)
  const [likes, setLikes] = useState(info.reply_likes)
  const [subrepliesOpen, setSubrepliesOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [clientOwns, setClientOwns] = useState(false)

  const thisReply = useRef()

  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)

  function handleReplyClick(){
    // check if user is logged in, if not, prompt user to log in
    if(!client){
      window.location.href = "/login"
      return
    }

    toggleCommentBox(info.reply_id)

  }

  function popSubReplies(index){
    let subreplies_copy = [...subreplies]
    subreplies_copy.splice(index, 1)
    console.log(subreplies_copy, index)
    setSubreplies(subreplies_copy)
  }

  async function handleDeleteReply(){
    let res = await fetch(`/api/posts/replies/${info.reply_id}?type=reply`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
    })

    if(res.status === 200){
      removeReply(index)
    }
  }


  async function LikeReply(info, type, likeStatus){
    // check if user is logged in, if not, prompt user to log in
    if(!client){
      window.location.href = "/login"
      return
    }
    
    if(!likeStatus){
      // make put request to increment likes by one
      await fetch(` /api/posts/replies/${type === "reply" ? info.reply_id : info.subreply_id}?type=${type}&method=like`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
      })
      // make post request to add to likes list
      let likers = await fetch(` /api/posts/replies/${type === "reply" ? info.reply_id : info.subreply_id}?type=${type}`, {
        method: "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
      })

      // set isliked state to true here if the type is a reply
      if(type === "reply"){
        setLikedStatus(true)
        setLikes((oldVal) => oldVal + 1)
      }
      return
    }
    else{
      // make put request to decrement likes by one
      await fetch(` /api/posts/replies/${type === "reply" ? info.reply_id : info.subreply_id}?type=${type}&method=unlike`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
      })
      // make delete request to remove from likes list
      let likers = await fetch(` /api/posts/replies/${type === "reply" ? info.reply_id : info.subreply_id}?type=${type}/likes`, {
        method: "DELETE",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
      })
      // set isliked to false here if the type is a reply
      if(type === "reply"){
        setLikedStatus(false)
        setLikes((oldVal) => oldVal - 1)
      }
      return
    }


  }

  async function handleSubcomment(replyInfo, text, ref_type, ref = null){
    
    // reply info is the imported info (either the reply replied to or subreply replied to)
    let subreplyJson = JSON.stringify({
      text,
      subreply_ref : ref
    })

    let subreply_info = await fetch(` /api/posts/replies/${info.reply_id}/replies?type=${ref_type}`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: subreplyJson
    })

    let subreplyObj = await subreply_info.json()
    let subrepliesCopy = [...subreplies]
    subrepliesCopy.unshift(subreplyObj)
    setSubreplies(subrepliesCopy);
    setSubrepliesOpen(true);
    
    toggleCommentBox(ref_type === "reply" ? replyInfo.reply_id : replyInfo.subreply_id)
  }
  
  const renderCondition = ( subreplies && subreplies.length > 0 && subrepliesOpen)
  var repliesToJSX
  if(renderCondition){
    repliesToJSX = subreplies.map((elem, index) =>
      <div className="sub-replies" key={elem.subreply_id}>
        <SubReply index={index} removeSubreply={popSubReplies} info={elem} userInfo = {userInfo} parentInfo={info} subreplies = {subreplies} loadedImages={loadedImages} commentBoxReference = {commentBoxReference} toggleCommentBox={toggleCommentBox} handleLike={LikeReply} token={token} handleSubcomment= {handleSubcomment}/>
      </div>
    )

  }

  useEffect(() => {

    async function getReplyInfo(){
      try{
        let userData = await fetch(` /api/users/${info.reply_author_id}?type=id`)
        
        let userDataJson = await userData.json()

        setReplyAuthorInfo(userDataJson)

      }
      catch(err){
        console.log(err)
      }
    }
    
    async function getReplyLikes(){
      try{
        let replyLikesList = await fetch(` /api/posts/${info.reply_id}/likes?type=reply`, {
          method: "GET",
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        
        let replyLikesListJson = await replyLikesList.json()
  
        setReplyLikeList(replyLikesListJson)
        setLikedStatus(replyLikesListJson.client_like_status? replyLikesListJson.client_like_status : false)
  
      }
      catch(err){
        console.log(err)
      }
    }

    getReplyInfo()
    getReplyLikes()

    setSubreplies(info.subreplies)

    setClientOwns(client &&  client.user_id === info.reply_author_id)
    console.log(info)

  }, [])

  useEffect(() => {
    if(thisReply.current){
      thisReply.current.addEventListener("mouseenter", () => setIsHovering(true))
      thisReply.current.addEventListener("mouseleave", () => setIsHovering(false))
    }

    return () => {
      if(thisReply.current){
        thisReply.current.removeEventListener("mouseenter", () => setIsHovering(true))
        thisReply.current.removeEventListener("mouseleave", () => setIsHovering(false))
      }
    }

  }, [thisReply.current])



  return (
    (replyAuthorInfo && replyLikeList && replyAuthorInfo && isLiked != null) && // RETURNS WHEN FETCHING AUTHOR INFO IS COMPLETE
    <div className="reply-container">
      <div className="reply" ref={thisReply}>
        <div style={{display: "flex", gap: "0.5em", alignItems: "flex-start"}}>
          <div className="reply-profile-img">{userInfo.user_pfp ? <img className="media" src={` /api/media/${userInfo.user_pfp}`} alt=""/> : loadedImages(info.stock_pfp)}</div>
          <div>
            <div className="reply-profile-content">
              <div className="reply-profile-name">{replyAuthorInfo.username}</div>
              <div className="reply-profile-reply">{info.reply_text}</div>
            </div>
            <div className="reply-stats">
              <div className="reply-time">{info.reply_time.slice(0, 10)}</div>
              <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => LikeReply(info, "reply", isLiked)}>
                {isLiked ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {likes}
              </Buttons.DefaultButton>
              <Buttons.DefaultButton theme="white" fontSize="0.8rem" contentColor="lightslategray" handleClick={() => handleReplyClick()}> Reply</Buttons.DefaultButton>
            </div>
            {
              (subreplies.length > 0 && info.reply_id !== commentBoxReference  && !subrepliesOpen) &&
              <Buttons.UnderlineButton theme="white" fontSize="0.9rem" contentColor="lightslategray" handleClick={() =>setSubrepliesOpen(true)}>
                <div className="see-sub-replies">
                  <IconComponents.ReturnbDownForwardIcon/>
                  <div> see <span style={{fontWeight: "bold"}}>{subreplies.length}</span> {subreplies.length > 1 ? "replies" : "reply"}</div>
                </div>
              </Buttons.UnderlineButton>
            }
          </div>
        </div>

        <div>{(isHovering && clientOwns) && <Buttons.DefaultButton theme="white" handleClick={() => handleDeleteReply()}><IconComponents.TrashIcon iconClass="delete-icon"/></Buttons.DefaultButton>}</div>
      </div>

      {info.reply_id === commentBoxReference && <ContentComment loadedImages = {loadedImages}  handleReply = {text => handleSubcomment(info, text, "reply")} isReplying = {true} replyTo={info} type="comment"/*replyToStats = {replyToStats} closeReply={ToggleReplyTo} *//>}

      {renderCondition && <div className="sub-replies-container">{repliesToJSX}</div>}

      {subrepliesOpen &&
        <Buttons.UnderlineButton handleClick={() => setSubrepliesOpen(false)} theme="white" fontSize="0.9rem" contentColor="lightslategray">
          <div className="see-sub-replies">See less</div>
        </Buttons.UnderlineButton>
      }
    
    </div>
    
  )
}