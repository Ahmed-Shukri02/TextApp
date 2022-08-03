import React from "react";
import { useEffect, useState, useContext } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import { MediaContext } from "../../Contexts/MediaContext";
import "./welcome.css"

export default function Welcome(){

  const {isTablet} = useContext(MediaContext)
  
  useEffect(() => {
    document.body.style.background = isTablet ? Backgrounds.LoginBackgroundMobile() : Backgrounds.LoginBackground()

    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"

    return () => {
      document.body.style.background = ""
    }
  }, [isTablet])

  return(
    <div className="welcome-page-container">
      <div className="welcome-box"></div>

    </div>
  )
}