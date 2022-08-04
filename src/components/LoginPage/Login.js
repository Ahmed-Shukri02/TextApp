import React, { useContext, useEffect, useState } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import "./login.css"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { MediaContext } from "../../Contexts/MediaContext";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Contexts/UserLoginStatus";

export default function Login(){

  const [isLogin, setIsLogin] = useState(null)
  const {isTablet} = useContext(MediaContext)
  let navigate = useNavigate()
  let {getLoggedInStatus} = useContext(isLoggedIn)

  useEffect(() => {
    
    (async() =>{
      
      setIsLogin(true)

      let logInStatus = await getLoggedInStatus()
      if(logInStatus){ // if user is logged in
        navigate("/", {replace: true})
      } 

    })()


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