import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../Contexts/MediaContext";
import { LoggedInContext } from "../../Contexts/UserLoginStatus";
import Footer from "../../Footer";
import Header from "../../Header";
import ContentPost from "../Content/ContentHome/ContentPost";
import PostPrompt from "../Content/ContentHome/PostPrompt";
import "./feed.css"

export default function Feed(){

  const [posts, setPosts] = useState(null)
  const [postsJSX, setPostsJSX] = useState(null)
  const [user, setUser] = useState(null)
  const {getUserID} = useContext(LoggedInContext)
  const {isTablet} = useContext(MediaContext)


  useEffect(() => {
    async function grabPosts(){
      let posts = await fetch(`http://localhost:5000/api/posts/all`, {method: "GET"})

      let posts_json = await posts.json()

      setPosts(posts_json)
    }
    async function grabUser(){
      let user = await getUserID()
      if(user){
        console.log(user)
        setUser(user)
      }
    }
    
    grabUser()
    grabPosts()

  }, [])

  useEffect(() => {
    async function getFinalJSX(){
      let posts_jsx = []
      let post_len = posts.length
      for(let i = 0; i < post_len; i++){
        let post_author = await queryUser(posts[i].post_author_id)
        posts_jsx.push(<ContentPost key={posts[i].post_id} userInfo={post_author} postInfo = {posts[i]} token={localStorage.getItem("userToken")}/>)
      }
  
      console.log(posts_jsx)
      setPostsJSX(posts_jsx)
    }

    if(posts) {
      getFinalJSX()
    }

  }, [posts])

  async function queryUser(user_id){
    let response = await fetch(`http://localhost:5000/api/users/${user_id}?type=id`, {method: "GET"})
    
    return await response.json() // returns user_info
  }


  return(
    <>
      <Header/>
        {postsJSX && 
        <div className="feed-container">
          {!isTablet && <div className="feed-options"></div>}
          <div className="content-home">
            <div className="content-home-right">
              {user &&<PostPrompt posts={posts} setPosts={setPosts} userInfo={user}/>}
              {postsJSX}
            </div>
          </div>
          {!isTablet && <div className="feed-users"></div>}
        </div>}
      <Footer/>
    </>
  )
}