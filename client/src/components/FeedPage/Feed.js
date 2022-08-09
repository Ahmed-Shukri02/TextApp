import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../Contexts/MediaContext";
import Footer from "../../Footer";
import Header from "../../Header";
import IconComponents from "../../icon-components/icon-components";
import Buttons from "../Buttons/Buttons";
import ContentPost from "../Content/ContentHome/ContentPost";
import PostPrompt from "../Content/ContentHome/PostPrompt";
import Backgrounds from "../../backgrounds/Backgrounds";
import "./feed.css"
import LoadingScreen from "../LoadingPage/LoadingPage";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { useSelector } from "react-redux";

export default function Feed(){

  const [posts, setPosts] = useState(null)
  const [postsJSX, setPostsJSX] = useState(null)
  const {isTablet} = useContext(MediaContext)
  const [loading, setLoading] = useState(true)

  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)

  let selectButtonProps = {
    theme: "white",
    width: "20em",
    height: "3em",
    addStyle: "no-center icon-button"
  }

  const headerStyle = {
    fontSize: "1.2rem",
    fontWeight: "600"
  }


  useEffect(() => {
    async function grabPosts(){
      let posts = await fetch(` /api/posts/all`, {method: "GET"})

      let posts_json = await posts.json()

      setPosts(posts_json)
    }

    grabPosts()
    document.body.style.background = Backgrounds.CircleBackground()
    document.body.style.backgroundSize = "contain"

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => document.body.style.background = ""

  }, [])

  // runs every time posts is affected
  useEffect(() => {
    async function getFinalJSX(){
      let posts_jsx = []
      let post_len = posts.length
      for(let i = 0; i < post_len; i++){
        let post_author = await queryUser(posts[i].post_author_id)
        posts_jsx.push(<ContentPost index={i} removeIndex={removeIndex} key={posts[i].post_id} userInfo={post_author} postInfo = {posts[i]} token={localStorage.getItem("userToken")}/>)
      }
  
      console.log(posts_jsx)
      setPostsJSX(posts_jsx)
    }

    if(posts) {
      getFinalJSX()
    }

  }, [posts])

  async function queryUser(user_id){
    let response = await fetch(` /api/users/${user_id}?type=id`, {method: "GET"})
    
    return await response.json() // returns user_info
  }

  function removeIndex(index){
    let posts_copy = [...posts]
    posts_copy.splice(index, 1)
    setPosts(posts_copy)
  }

  return(
    <>
      <Header/>
        <AnimatePresence>
          {loading && <LoadingScreen/>}
        </AnimatePresence>

        {postsJSX && 
        <div className="feed-container">
          {!isTablet && <div className="feed-left" style={{backgroundColor: "white"}}>
            <div className="feed-options">
              <div className="feed-options-basic">
                <Buttons.DefaultButton {...selectButtonProps}><IconComponents.HomeIcon/> Home</Buttons.DefaultButton>
                <Buttons.DefaultButton {...selectButtonProps}><IconComponents.UserIcon/> My Profile</Buttons.DefaultButton>
              </div>
              <div className="friends-flex">
                <div style={headerStyle}>Online Friends</div>
                <div> This feature has not been added yet. </div>
              </div>
              <div className="suggested-users">
                <div style={headerStyle}>Suggested Users</div>
                <div> This feature has not been added yet. </div>
              </div>
            </div>
          </div>}
          <div className="content-home">
            <div className="content-home-right">
              <h2 className = "feed-welcome-text">Welcome, User!</h2>
              {client &&<PostPrompt posts={posts} setPosts={setPosts} userInfo={client}/>}
              {postsJSX}
            </div>
          </div>
        </div>}
      <Footer/>
    </>
  )
}