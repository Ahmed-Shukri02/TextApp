import React, { useContext, useEffect, useState } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import "./login.css"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { MediaContext } from "../../Contexts/MediaContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Login(){

  const [isLogin, setIsLogin] = useState(null)
  const {isTablet} = useContext(MediaContext)
  let navigate = useNavigate()
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
          appId            : '764258108119653',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v11.0'
      })
    }
    (function (d, s, id) { // add script tag
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s); js.id = id
        js.src = "https://connect.facebook.net/en_US/sdk.js"
        fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    
    console.log("facebook-sdk added")  
    setIsLogin(true)
    if(client){ // if user is logged in
      navigate("/", {replace: true})
    }

    return () => {
      document.body.style.background = ""
    }
  }, [])

  function FBCheckLoginStatus(response){
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      window.FB.api("/me", function(response){
        console.log(response)
      })
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.'
    }
  }


  useEffect(() => {
    document.body.style.background = isTablet ? Backgrounds.LoginBackgroundMobile() : Backgrounds.LoginBackground()

    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"
  }, [isTablet])

  return(
    <div className="login-page-container">
      <div className="login-container">
        {
          isLogin ? 
          <GoogleOAuthProvider clientId="403155431508-3qg8b5dk57rdv2ngtf9ki92vsn3ifh5g.apps.googleusercontent.com">
            <SignIn setIsLogin={setIsLogin}/> 
          </GoogleOAuthProvider>
          : <SignUp setIsLogin={setIsLogin}/>
        }
      </div>
    </div>
  )
}