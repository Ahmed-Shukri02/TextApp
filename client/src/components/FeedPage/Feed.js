import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../Contexts/MediaContext";
import Footer from "../../Footer";
import Header from "../../Header";
import ContentPost from "../Content/ContentHome/ContentPost";
import PostPrompt from "../Content/ContentHome/PostPrompt";
import Backgrounds from "../../backgrounds/Backgrounds";
import "./feed.css"
import LoadingScreen from "../LoadingPage/LoadingPage";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebars/Sidebar";
import ProfileCard from "../ProfileCard"
import { useMediaQuery } from "react-responsive";
import serverLocation from "../../Tools/serverLocation";

export default function Feed(){

  const [posts, setPosts] = useState(null)
  const [postsJSX, setPostsJSX] = useState(null)
  const {isTablet} = useContext(MediaContext)
  const [loading, setLoading] = useState(true)
  const [userSidebar, setUserSidebar] = useState({user: null, sidebarOpen: false})

  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)
  
  const userSidebarQuery = useMediaQuery({query: "(max-width: 1250px)"})


  useEffect(() => {
    async function grabPosts(){
      let posts = await fetch(` ${serverLocation}/api/posts/all`, {method: "GET"})

      let posts_json = await posts.json()

      setPosts(posts_json)
    }

    grabPosts()
    document.body.style.background = Backgrounds.CircleBackground()
    document.body.style.backgroundSize = "contain"
    document.title = "Feed"

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => document.body.style.background = ""

  }, [])

  function feedHandleNameClick(userInfo){
    setUserSidebar({user: userInfo, sidebarOpen: true})
  } 

  function feedHandleClickOff(){
    setUserSidebar({...userSidebar, sidebarOpen: false})
  }

  // runs every time posts is affected
  useEffect(() => {
    async function getFinalJSX(){
      let posts_jsx = []
      let post_len = posts.length
      for(let i = 0; i < post_len; i++){
        let post_author = await queryUser(posts[i].post_author_id)
        posts_jsx.push(<ContentPost fromFeed={!userSidebarQuery} feedHandleNameClick={feedHandleNameClick} index={i} removeIndex={removeIndex} key={posts[i].post_id} userInfo={post_author} postInfo = {posts[i]} token={localStorage.getItem("userToken")}/>)
      }
  
      console.log(posts_jsx)
      setPostsJSX(posts_jsx)
    }

    if(posts) {
      getFinalJSX()
    }

  }, [posts])

  async function queryUser(user_id){
    let response = await fetch(` ${serverLocation}/api/users/${user_id}?type=id`, {method: "GET"})
    
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
          {!isTablet && <Sidebar/>}
          <div className="content-home">
            <div className="content-home-right">
              <h2 className = "feed-welcome-text">Welcome, User!</h2>
              {client &&<PostPrompt posts={posts} setPosts={setPosts} userInfo={client}/>}
              {postsJSX}
            </div>
          </div>
          
          <AnimatePresence>
            {(!userSidebarQuery && userSidebar.sidebarOpen) && <>
            <div style={{flexGrow: 1}}></div>
            <div style={{flexBasis: "40%", position: "relative"}}>
              <motion.div style={{position: "absolute", height: "100%", width: "100%"}}
              initial={{left: "100vw"}}
              animate={{left: "0"}}
              exit={{left: "100vw"}}
              transition={{type: "tween", ease: "easeOut", duration: ".5"}}>
                <ProfileCard fromFeed={true} feedHandleClickOff={feedHandleClickOff} userInfo={userSidebar.user}/>
              </motion.div>
            </div>
            </>}
          </AnimatePresence>
        </div>}
      <Footer/>
    </>
  )
}