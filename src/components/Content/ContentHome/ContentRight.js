import React from "react";
import { useState, useEffect } from "react";
import ContentPost from "./ContentPost";
import Posts from "./posts.json"

export default function ContentRight({userInfo}){
  
  const [posts, setPosts] = useState([])

  useEffect(() =>{
    // do get request for users posts
    async function getPosts(){
      try{
        let posts = await fetch(`http://localhost:5000/api/posts?author_id=${userInfo.user_id}`)

        let postsJson = await posts.json()
        console.log(postsJson)
        setPosts(postsJson)
      }
      catch(err){
        console.log(err)
      }
    }
    
    getPosts()
  }, [])
  
  const postsJSX = posts.map(elem => <ContentPost postInfo={elem} userInfo={userInfo} key={elem.post_id} /* AddReply = {AddReply} AddReplyLike={handleReplyLike} AddReplyTo = {AddReplyTo} handleCloseComments = {closeAllCommentBox} toggleSubCommentBox ={toggleSubCommentBox} handlerToggleSubComments={handlerToggleSubComments} *//>)

  return (
    <div className="content-home-right">
      {postsJSX}
    </div>
  )
}