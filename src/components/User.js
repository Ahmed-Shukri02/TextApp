import React from "react";
import {Link, Route, Routes, useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ContentHome from "./Content/ContentHome/ContentHome";
import ContentReview from "./Content/ContentReview/ContentReview";
import IconComponents from "../icon-components/icon-components";

export default function User(){
  
  const [userInfo, setUserInfo] = useState(null)
  const [doesExist, setExistStatus] = useState(null)

  let {id} = useParams();
  
  // PLACEHOLDER TOKEN - NO LOGIN AUTH SET SO USE THIS TOKEN - UPDATE TOKEN AFTER EVERY LOGIN

  ///////////////////////////////////////////////////////////////////////////////////////

  // logged in as brain
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjkyYjA3NWMtZTIxNi00MmQ2LThkM2EtOGQ1MjU1MDAyY2JiIiwiaWF0IjoxNjU5MDE0NjA0fQ.EG5v0L1m07cisJcAwVF9BuFeC7STyJqoyKRLRK55Vt4"

  ///////////////////////////////////////////////////////////////////////////////////////

  // fetch current user based on url
  useEffect(() => {
    async function getData(){
      try{
        let response = await fetch(`http://localhost:5000/api/users/${id}`, {method: "GET"})
        
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

        setTimeout(() => {
          setUserInfo(profileInfo)
          setExistStatus(true)
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
        <div style={{height: "100%", backgroundColor: "lightgray", opacity: "50%", display: "flex", alignItems:"center"}}>
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
    <> {getPage()} </>
  )
}