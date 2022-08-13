import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import ProfileLink from "./profileLink";
import IconComponents from "../icon-components/icon-components";
import ProfileNav from "./profileNav";
import { StockImages } from "../Contexts/StockImages";
import ContentLeft from "./Content/ContentHome/ContentLeft";
import LoadingScreen from "./LoadingPage/LoadingPage";

export default function ProfileCard({userInfo, fromFeed, feedHandleClickOff}){
  
  const [loaded, setLoaded] = useState(false)
  const {images} = useContext(StockImages)
  const bg = useRef()

  useEffect(() => {
    if(fromFeed){
      setTimeout(() => {
        setLoaded(true)
      }, 2000);
    }
    else{
      setLoaded(true)
    }

  }, [])

  useEffect(() => {
    if(bg.current){
      bg.current.style.background = userInfo.bg_image ? `url(/api/media/${userInfo.bg_image})` : `url( /uploads/users/1659621653816logo192.png)`
    }
  }, [bg])

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
    ! loaded ? <LoadingScreen disableScroll={false}/> :
    <div className="profile-card">
      <div className="bg">
        <div className="bg-image" ref={bg}></div>
      </div>

      <div className="profile-info-flex">
        <div className="profile-info">
          
          <div className="profile-name-img">
            <div style={{flexBasis: "20%"}}>
              <div className="profile-img-container">
                { userInfo && (
                  userInfo.user_pfp ? <img className = "profile-img" src={userInfo.oauth_login ? userInfo.user_pfp : `/api/media/${userInfo.user_pfp}`} referrerPolicy="no-referrer" alt=""/> : loadSingleImg(userInfo.stock_pfp)
                  )
                }
              </div>
            </div>
            {profileName()}
          </div>
          
          <ProfileLink fromFeed={fromFeed} feedHandleClickOff={feedHandleClickOff}/>
        </div>
      </div>  

      <ProfileNav userInfo={userInfo}/>
      <ContentLeft userInfo={userInfo}/>

    </div>
  )
}