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

export default function User(){
  
  const [userInfo, setUserInfo] = useState(null)
  const [doesExist, setExistStatus] = useState(null)
  const [images, setImages] = useState(null)


  let {id} = useParams();
  
  // PLACEHOLDER TOKEN - NO LOGIN AUTH SET SO USE THIS TOKEN - UPDATE TOKEN AFTER EVERY LOGIN

  ///////////////////////////////////////////////////////////////////////////////////////

  // logged in as brain
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjkyYjA3NWMtZTIxNi00MmQ2LThkM2EtOGQ1MjU1MDAyY2JiIiwiaWF0IjoxNjU5MzQwOTM5fQ.9FWsS6ay2WGPskUFReqwMQUmd4VQfIRIfRv2R1M5GYs"

  // logged in as brain2
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzQ5YmVkZmYtZDhlOC00MjMzLTllYzgtNGNmYjY1ODkxZjMzIiwiaWF0IjoxNjU5MzQwODk4fQ.Y0dGBFnJU54d1Oh7bnOei7bvk4-VybEeA7SfK_hhMQg"

  token = localStorage.getItem("userToken")

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

        // get stock images
        let picResponse = await fetch('https://picsum.photos/v2/list')
        let picResponseJSON = await picResponse.json();
    
        
        setTimeout(() => {
          setUserInfo(profileInfo)
          setExistStatus(true)
          setImages(picResponseJSON);
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
  
  function loadedImages(num){
    return images ?
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }
  
  
  return (
    <div className="Users">
      <StockImages.Provider value={{images, loadedImages}}>
        <Header/>
          {getPage()}
        <Footer/>
      </StockImages.Provider>
    </div>
  )
}