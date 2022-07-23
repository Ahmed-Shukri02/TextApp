import React from "react";
import ProfileLink from "./profileLink";
import IconComponents from "../icon-components/icon-components";
import ProfileNav from "./profileNav";

export default function ProfileCard(){
  
  return (
    <div className="profile-card">
      <div className="bg">
        <div className="bg-image"></div>
      </div>

      <div className="profile-info-flex">
        <div className="profile-info">
          
          <div className="profile-name-img">
            <div className="profile-img-container">
              <img className = "profile-img" src="./images/insta-profile.jpg" alt=""/>
            </div>
            <div className="profile-name">
              <h2 style={{margin: "0"}}>Instagram <span><IconComponents.Checkmark/></span> </h2>
              <div style={{color: "lightslategray"}}>@instagram  · App Page</div>
            </div>
          </div>
          
          <ProfileLink />
        </div>
      </div>  

      <ProfileNav/>

    </div>
  )
}