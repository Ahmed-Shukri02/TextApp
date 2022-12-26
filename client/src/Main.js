import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import User from "./components/User";
import Login from "./components/LoginPage/Login";
import { MediaContext } from "./Contexts/MediaContext";
import { useMediaQuery } from "react-responsive";
import Home from "./components/HomePage/Home";
import Welcome from "./components/WelcomePage/Welcome";
import Feed from "./components/FeedPage/Feed";
import { StockImages } from "./Contexts/StockImages";
import { login } from "./Tools/clientInfo";
import { useSelector, useDispatch } from "react-redux";
import OauthLoginRedirect from "./components/LoginPage/OauthLoginRedirect";
import serverLocation from "./Tools/serverLocation";


export default function Main(){
  
  const isMobile = useMediaQuery({query: "(max-width: 650px)"})
  const isTablet = useMediaQuery({query: "(max-width: 1000px)"})

  const [images, setImages] = useState(null)
  const [contextsReady, setContextsReady] = useState(false)

  const clientInfo = useSelector((state) => {console.log(state); return state.clientInfo.value? state.clientInfo.value.payload : null})
  const dispatch = useDispatch()

  async function getLoggedInStatus(){
    // check if user has a token of "usertoken"
    if(!localStorage.getItem("userToken")){
      return false;
    }
    
    try{
      let userStatus = await fetch(` ${serverLocation}/api/users/login`, {
        method: "GET",
        headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
      })
  
      if([403, 500].includes(userStatus.status)){
        return false
      }
      else{
        return true
      }
  
    }
    catch(err){
      console.log(err)
    }
  }
  
  async function getUserID(){
    if(!localStorage.getItem("userToken")){
      return null;
    }
  
    try{
      let user_id = await fetch(` ${serverLocation}/api/users/my_id`, {
        method: "GET",
        headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
      })
      let user_id_json = await user_id.json()
      console.log(user_id_json)
  
      return user_id_json ? user_id_json : null
    }
    catch(err){
      console.log(err)
      return null
    }
  }

  useEffect(() => {
    async function getData(){
      // get stock images
      let picResponse = await fetch('https://picsum.photos/v2/list')
      let picResponseJSON = await picResponse.json();

      setImages(picResponseJSON)
    }
    async function setUpClient(){
      let isLoggedIn = await getLoggedInStatus()
      if(isLoggedIn){
        let clientInfoRes = await getUserID()
        dispatch(login(clientInfoRes))
        console.log(clientInfo)
        setContextsReady(true)
      }
      else{
        setContextsReady(true)
      }
    }

    setUpClient()
    getData()
  }, [])

  function loadedImages(num){
    return images ?
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }
  
  return (
    (images && contextsReady) &&
    <StockImages.Provider value={{images, loadedImages}}>
      <MediaContext.Provider value={{isMobile, isTablet}}>
        <Routes>
          <Route path="users/:id/*" element={<User/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/oauth-login" element={<OauthLoginRedirect/>}/>
        </Routes>
      </MediaContext.Provider>
    </StockImages.Provider>
  )
}