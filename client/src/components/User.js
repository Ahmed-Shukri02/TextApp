import React from "react";
import {Link, Route, Routes, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ContentHome from "./Content/ContentHome/ContentHome";
import ContentReview from "./Content/ContentReview/ContentReview";
import IconComponents from "../icon-components/icon-components";
import { StockImages } from "../Contexts/StockImages";
import Header from "../Header";
import Footer from "../Footer";
import LoadingScreen from "./LoadingPage/LoadingPage";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

export default function User(){
  
  const [userInfo, setUserInfo] = useState(null)
  const [doesExist, setExistStatus] = useState(null)
  const [loading, setLoading] = useState(true)


  let {id} = useParams();
  
  // PLACEHOLDER TOKEN - NO LOGIN AUTH SET SO USE THIS TOKEN - UPDATE TOKEN AFTER EVERY LOGIN

  ///////////////////////////////////////////////////////////////////////////////////////

  let token = localStorage.getItem("userToken")

  ///////////////////////////////////////////////////////////////////////////////////////

  // fetch current user based on url
  useEffect(() => {
    async function getData(){
      try{
        let response = await fetch(` /api/users/${id}`, {method: "GET"})
        
        if(response.status === 400){
          let errMessage = await response.text()
          console.log(errMessage)
          
          setTimeout(() => {
            setUserInfo({})
            setExistStatus(false)
          }, 5000)

          return
        }

        let profileInfo = await response.json()
        console.log(profileInfo)
        
        setUserInfo(profileInfo)
        setExistStatus(true)
        
        setTimeout(() => {
          setLoading(false)
        }, 3000)



      }
      catch(err){
        console.log(`Err in fetching data: ${err.message}`)
      }
    }


    getData();

  }, [])

  function getPage(){
    if(!userInfo){
      return (
        <div style={{minHeight: "100vh", backgroundColor: "lightgray", opacity: "50%", display: "flex", alignItems:"center"}}>
          <div className="loading-icon"><IconComponents.LoadingIcon/></div>
        </div>
      )
    }
    
    
    else if(doesExist){
      return (
          <div className="main-container">
            <ProfileCard userInfo={userInfo}/> 
          
            <div className="content-container">
              <Routes>
                <Route path='home' element={<ContentHome userInfo={userInfo} token={token}/>} />
                <Route path='review' element={<ContentReview userInfo={userInfo} token={token}/>} />
              </Routes>
            </div>

          </div>
      )
    }

    else if(!doesExist){
      return (
        <div> This user does not exist </div>
      )
    }

    else{
      return;
    }
  }
  
  
  return (
    <div className="Users">
      <Header/>
        <AnimatePresence>{loading && <LoadingScreen/>}</AnimatePresence>
        
        {userInfo && <div className="main-container">
            <ProfileCard userInfo={userInfo}/> 
          
            <div className="content-container">
              <Routes>
                <Route path='home' element={<ContentHome userInfo={userInfo} token={token}/>} />
                <Route path='review' element={<ContentReview userInfo={userInfo} token={token}/>} />
              </Routes>
            </div>

          </div>}
      <Footer/>
    </div>
  )
}