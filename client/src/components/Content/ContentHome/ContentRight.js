import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import ContentPost from "./ContentPost";
import PostPrompt from "./PostPrompt";
import { useSelector } from "react-redux";

export default function ContentRight({userInfo, token}){
  
  const [posts, setPosts] = useState([])
  const [noPosts, setNoPosts] = useState(null)
  const [isUser, setIsUser] = useState(null)
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)


  useEffect(() =>{
    // do get request for users posts
    async function getPosts(){
      try{
        let posts = await fetch(` /api/posts?author_id=${userInfo.user_id}`, {
          method: "GET",
          headers: {"Authorization" : `Bearer ${token}`}
        })

        let postsJson = await posts.json()
        if(postsJson === -1){ // -1 means no post, -2 means no user
          setNoPosts(true)
        } else{
          setPosts(postsJson)
        }

      }
      catch(err){
        console.log(err)
      }
    }
    
    async function checkIsUsersPage(){
      if(client && client.user_id === userInfo.user_id){
        setIsUser(true)
      } else setIsUser(false)
    }
    
    getPosts()
    checkIsUsersPage()
  }, [])

  function popIndex(index){
    let posts_copy = [...posts]
    posts_copy.splice(index, 1)
    setPosts(posts_copy)
  }
  
  const postsJSX = posts && posts.map((elem, index) => <ContentPost index={index} removeIndex = {popIndex} postInfo={elem} userInfo={userInfo} key={elem.post_id}/>)


  return (
    <div className="content-home-right">
      { noPosts &&
        <div style={{textAlign: "center", marginBottom: "1em"}}> This user has no posts </div>
      }

      {isUser && <PostPrompt posts={posts} userInfo = {userInfo} setPosts={setPosts}/>}

      {postsJSX}
    </div>
  )
}