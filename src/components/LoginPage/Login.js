import React, { useContext, useEffect, useState } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import "./login.css"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { MediaContext } from "../../Contexts/MediaContext";

export default function Login(){

  const [isLogin, setIsLogin] = useState(null)
  const {isTablet} = useContext(MediaContext)

  useEffect(() => {
    setIsLogin(true)

    return () => {
      document.body.style.background = ""
    }
  }, [])

  useEffect(() => {
    document.body.style.background = isTablet ? Backgrounds.LoginBackgroundMobile() : Backgrounds.LoginBackground()

    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"
  }, [isTablet])

  return(
    <div className="login-page-container">
      <div className="login-container">
        {
          isLogin ? <SignIn setIsLogin={setIsLogin}/> : <SignUp setIsLogin={setIsLogin}/>
        }
      </div>
    </div>
  )
}