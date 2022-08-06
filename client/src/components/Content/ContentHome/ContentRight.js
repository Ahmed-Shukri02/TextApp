import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { LoggedInContext } from "../../../Contexts/UserLoginStatus";
import ContentPost from "./ContentPost";
import PostPrompt from "./PostPrompt";

export default function ContentRight({userInfo, token}){
  
  const [posts, setPosts] = useState([])
  const [noPosts, setNoPosts] = useState(null)
  const [isUser, setIsUser] = useState(null)
  const {getUserID} = useContext(LoggedInContext)


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
      let user_id_res = await getUserID()
      console.log(user_id_res)
      if(user_id_res && user_id_res.user_id === userInfo.user_id){
        setIsUser(true)
      } else setIsUser(false)
    }
    
    getPosts()
    checkIsUsersPage()
  }, [])

  
  const postsJSX = posts && posts.map(elem => <ContentPost postInfo={elem} userInfo={userInfo} key={elem.post_id} token={token}/>)


  return (
    <div className="content-home-right">
      { noPosts &&
        <div style={{textAlign: "center"}}> This user has no posts </div>
      }

      {isUser && <PostPrompt posts={posts} userInfo = {userInfo} setPosts={setPosts}/>}

      {postsJSX}
    </div>
  )
}