import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ProfileLink from "./profileLink";
import IconComponents from "../icon-components/icon-components";
import ProfileNav from "./profileNav";
import { StockImages } from "../Contexts/StockImages";

export default function ProfileCard({userInfo}){
  
  const {images} = useContext(StockImages)

  function loadSingleImg(num){
    return images? 
      <img className="profile-img" src={images[num].download_url} alt="single-1"/> : 
      <div className="profile-img related-image-loading"></div>
  }
  
  function profileName(){
    if(userInfo){
      if(userInfo.f_name || userInfo.l_name){
        return(
          <div className="profile-name">
            <h2 style={{margin: "0"}}>{userInfo.f_name} {userInfo.l_name}<span>{userInfo.is_verified && <IconComponents.Checkmark/>}</span> </h2>
            <div style={{color: "lightslategray"}}>@{userInfo.username}  · user</div>
          </div>
        )
      }

      else{
        return(
          <div className="profile-name">
            <h2 style={{margin: "0"}}>{userInfo.username}<span>{userInfo.is_verified && <IconComponents.Checkmark/>}</span> </h2>
            <div style={{color: "lightslategray"}}>@{userInfo.username}  · App Page</div>
          </div>
        )
      }
    }
    else return( <> </>) // data hasn't loaded yet
  }
  
  return (
    <div className="profile-card">
      <div className="bg">
        <div className="bg-image"></div>
      </div>

      <div className="profile-info-flex">
        <div className="profile-info">
          
          <div className="profile-name-img">
            <div className="profile-img-container">
              { userInfo && (
                userInfo.user_pfp ? <img className = "profile-img" src={userInfo.user_pfp} alt=""/> : loadSingleImg(userInfo.stock_pfp)
                )
              }
            </div>
            {profileName()}
          </div>
          
          <ProfileLink />
        </div>
      </div>  

      <ProfileNav userInfo={userInfo}/>

    </div>
  )
}