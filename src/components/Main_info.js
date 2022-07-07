import React from "react";
import profile from "./insta-profile.jpg";
import ProfileLink from "./profileLink";
import Checkmark from "./checkmark-circle-outline";


export default function Main_info(){
    
    return (
        <div className="main-info">
            <div className="bg">
                <div className="bg-image"></div>
            </div>

            <div className="profile-info-flex">
                <div className="profile-info">
                    <div className="profile-img-container">
                        <img className = "profile-img" src={profile} alt="Instagram"/>
                    </div>
                    <div className="profile-name">
                        <h2 style={{margin: "0"}}>Instagram <span><Checkmark/></span> </h2>
                        <div style={{color: "lightslategray"}}>@instagram  · App Page</div>
                    </div>
                    
                    <ProfileLink />
                </div>
            </div>
        </div>
    )
}