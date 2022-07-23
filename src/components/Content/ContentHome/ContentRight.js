import React from "react";
import { useState, useEffect } from "react";
import ContentPost from "./ContentPost";
import Posts from "./posts.json"

export default function ContentRight(){
  
  const [posts, setPosts] = useState([])

  function AddReply(postKey, replyInfo){
    let newPosts = [...posts] // creating deep copy of posts

    newPosts[postKey].replies.forEach((reply) => { // increment each reply by 1 to allow new reply of index 0
      reply.key ++
      reply.parentKey ++
    })

    newPosts[postKey].replies.unshift(replyInfo)
    newPosts[postKey].comments ++;
    
    setPosts(newPosts)
  }

  function AddReplyTo(postKey, replyInfo){
    let newPosts = [...posts]
    let repliesTo = newPosts[postKey].replies[replyInfo.parentKey].repliesTo
    newPosts[postKey].replies[replyInfo.parentKey].repliesTo = [...repliesTo, replyInfo]
    
    setPosts(newPosts)
  }


  function handleReplyLike(replyInfo, postKey, isLiked){
    let newPosts = [...posts]
    let reply = replyInfo.type === "comment" ? newPosts[postKey].replies[replyInfo.key] : newPosts[postKey].replies[replyInfo.parentKey].repliesTo[replyInfo.key]
    
    reply.likes = isLiked? parseInt(reply.likes) - 1 : parseInt(reply.likes) + 1
    reply.userLike = !reply.userLike
    
    setPosts(newPosts)
  }

  function closeAllCommentBox(postKey){
    let newPosts = [...posts]
    
    newPosts[postKey].replies.forEach((reply) => {
      reply.commentBox = false;

      reply.repliesTo.forEach((subReply) => {
        subReply.commentBox = false;
      })
    })

    setPosts(newPosts);
  }

  function handlerToggleSubComments(postKey, replyInfo, open){
    let newPosts = [...posts]
    newPosts[postKey].replies[replyInfo.key].isViewingSubs = open;

    setPosts(newPosts)
  }
  

  function toggleSubCommentBox(replyInfo, postKey, open){
    let newPosts = [...posts];

    if(replyInfo.type === "comment") {
      newPosts[postKey].replies[replyInfo.parentKey].commentBox = open
    } // comment
    else {
      newPosts[postKey].replies[replyInfo.parentKey].repliesTo[replyInfo.key].commentBox = open
    } // subcomment
    
    
    setPosts(newPosts)
    
  }


  useEffect(() =>{
    setPosts([Posts.postInfo, Posts.postInfo2, Posts.postInfo3])
  }, [])
  
  const postsJSX = posts.map(elem => <ContentPost postInfo={elem} key={elem.key} AddReply = {AddReply} AddReplyLike={handleReplyLike} AddReplyTo = {AddReplyTo} handleCloseComments = {closeAllCommentBox} toggleSubCommentBox ={toggleSubCommentBox} handlerToggleSubComments={handlerToggleSubComments}/>)

  return (
    <div className="content-home-right">
      {postsJSX}
    </div>
  )
}