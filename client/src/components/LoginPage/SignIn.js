import React, { useEffect, useRef, useState } from "react";
import Buttons from "../Buttons/Buttons";
import {useNavigate} from "react-router-dom"
import IconComponents from "../../icon-components/icon-components";
import { useContext } from "react";
import { MediaContext } from "../../Contexts/MediaContext";
import { useGoogleLogin } from "@react-oauth/google";
import {useLinkedIn} from "react-linkedin-login-oauth2"

export default function SignIn({setIsLogin}){

  let navigate = useNavigate()
  
  const {isMobile} = useContext(MediaContext)
  const emailInput = useRef(null)

  const[emailValidated, setEmailValidation] = useState(true)
  const[emailIsEmpty, setEmailIsEmpty] = useState(false)
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)

  const {linkedInLogin} = useLinkedIn({
    clientId: "78sp3v4gmbpcwe",
    redirectUri: `${window.location.origin}/oauth-login`,
    onSuccess: (code) => {
      console.log("success")
      console.log(code)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const google_login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fetch info using token response
      let userInfo = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)

      let userInfoJson = await userInfo.json()
      //console.log(userInfoJson)

      let res = await fetch(`/api/users/oauth_login/${userInfoJson.sub}?provider=google`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          username: userInfoJson.name,
          f_name: userInfoJson.given_name, 
          l_name: userInfoJson.family_name,
          user_pfp: userInfoJson.picture,
          email: userInfo.email 
        })
      })

      let resJson = await res.json()
      console.log(resJson)

      localStorage.setItem("userToken", resJson.token)
      window.location = "/feed"

    },
    onError: () => console.log("login failed")
    
  })

  function emailValidationMessage(){
    if(emailIsEmpty){
      return <div className="invalidated">Field is Empty</div>
    }
    else if (!emailValidated){
      return <div className="invalidated">Invalid Email</div>
    }
    else{ return }
  }

  function handleEmailInput(){
    let emailMatch = emailInput.current.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    
    setEmailValidation(emailMatch ? true : false)

  }

  useEffect(() => {
    emailInput.current.addEventListener("input", handleEmailInput)

    return () => {emailInput.current && emailInput.current.removeEventListener("input", handleEmailInput)}
  }, [])

  function HandleLogin(e){
    // client side verification: check if email and password have been filled in and email is of correct type
    e.preventDefault()

    let emailVal = e.target.elements["email"]
    let password = e.target.elements["password"]
    
    
    // check if email field is empty
    if(!emailVal.value){
      setEmailIsEmpty(true)
      
      emailVal.addEventListener("input", () => {
        setEmailIsEmpty(false)
      }, {once: true})

    }
    
    // check if password is empty
    if(!password.value){
      setPasswordIsEmpty(true)
      password.addEventListener("input", () => {
        setPasswordIsEmpty(false)
      }, {once: true})
      
    }
    
    let validRequirement = (emailVal.value && password.value && emailValidated)

    if(validRequirement){
      // make a query to try to log in 
      (async () => {
        try{
          let res = await fetch(` /api/users/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
              email: emailVal.value,
              password: password.value
            })
          })

          if(res.status != 403){
            let resJson = await res.json()
            console.log(resJson.token)
            localStorage.setItem("userToken", resJson.token)
            
            window.location.href = `../users/${resJson.username}`
          }
          else{
            console.log("Access Denied")
          }
        }
        catch(err){
          console.log(err)
        }
      })()
    }

  }

  async function googleOuath(){
    //window.location = process.env.NODE_ENV === "production" ? "https://rocky-brook-55283.herokuapp.com/google" : "http://localhost:5000/google"

    google_login()

  }

  async function facebookOauth(){
    var isConnected;
    window.FB.getLoginStatus(function(response){
      if(response.status === "connected"){
        console.log("user is already connected")
        isConnected = true;

      }
    })
    
    if(isConnected) {return;}

    window.FB.login(function(response){
      if(!response.authResponse){
        return;
      }
      window.FB.api("/me", {fields: "id, name, picture"}, async function(response){
        console.log("logged in")
        console.log(response)
        // make fetch request to do oauth login
        let split_name = response.name.split(" ")
        let [f_name, l_name] = [split_name[0], split_name[split_name.length -1]]

        let res = await fetch(`/api/users/oauth_login/${response.id}?provider=facebook`, {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            username: response.name,
            f_name, l_name,
            user_pfp: response.picture.data.url,
            email: `${l_name}@facebook.com` 
          })
        })
        
        let resJson = await res.json()
        console.log(resJson)

        
        console.log("logging out...")
        window.FB.logout(function(response){return;})
        
        // user now has token and has logged out of facebook session, return to feed
        localStorage.setItem("userToken", resJson.token)
        window.location = "/feed"
      })
    }, {
      auth_type: "reauthenticate"
    })
  }

  async function linkedinOauth(){
    // change window location to linkedin's auth page
    //window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78sp3v4gmbpcwe&redirect_uri=http://localhost:3000/oauth-login&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=K43XABK3IEVEfLr38cZV`

    window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78sp3v4gmbpcwe&redirect_uri=${window.location.origin}/oauth-login&scope=r_emailaddress`

    //linkedInLogin()
  }



  return(
    <>
        <div className="sign-in">
          Sign-In
        </div>

        <div className="sign-in-details-container">
          <form className="sign-in-details" onSubmit={HandleLogin}>
            <div className="form-entry">
              <label htmlFor="email">
                <div>Email</div>
                {emailValidationMessage()}
              </label>
              <input ref={emailInput} id="email" name="email" type="email" placeholder="Email Address"/>
            </div>
            <div className="form-entry">
              <label htmlFor="password">
                <div>Password</div>
                {passwordIsEmpty && <div className="invalidated">Field is Empty</div>}
              </label>
                <input id="password" name="password" type="password"/>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Buttons.DefaultButton height="3em" width="80%" contentColor="white" submit={true}>
                Login
              </Buttons.DefaultButton>
            </div>

            <div className="login-help">
              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem">Can't Log In?</Buttons.UnderlineButton>

              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem" handleClick={() => setIsLogin(false)}>New User?</Buttons.UnderlineButton>
            </div>
          </form>

          {/*  OR SEPERATOR */}
          <div style={{display: "flex", alignItems: "center", width: "80%", color: "lightslategray"}}>
            <div style={{display: "inline-block", flexGrow: "1"}}> <hr style={{width: "80%"}}/></div>
            OR
            <div style={{display: "inline-block", flexGrow: "1"}}> <hr style={{width: "80%"}}/></div>
          </div>

          {
          !isMobile ?
            /* IF REGULAR DEVICE */
          <div className="external-login">
            <Buttons.DefaultButton handleClick={() => googleOuath()} theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.GoogleIcon iconClass="login-button-icons"/>
                Continue with Google
              </div>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton handleClick={() => {facebookOauth()}} theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.FaceBookIcon iconClass="login-button-icons" color="#1B74E4"/>
                Continue with Facebook
              </div>
            </Buttons.DefaultButton>
            {/* <Buttons.DefaultButton handleClick={() => linkedinOauth()} theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.LinkedInIcon iconClass="login-button-icons" color="#1B74E4"/>
                Continue with LinkedIn
              </div>
            </Buttons.DefaultButton> */}
          </div>
          :
            /* IF MOBILE (650px and under) */
          <div className="external-login">
            <Buttons.DefaultButton theme="white" height="3.5em">
              <IconComponents.GoogleIcon iconClass="login-button-icons" color="#1B74E4"/>
            </Buttons.DefaultButton>

            <Buttons.DefaultButton theme="white" height="3.5em">
              <IconComponents.FaceBookIcon iconClass="login-button-icons" color="#1B74E4"/>
            </Buttons.DefaultButton>

            <Buttons.DefaultButton theme="white" height="3.5em">
              <IconComponents.LinkedInIcon iconClass="login-button-icons" color="#1B74E4"/>
            </Buttons.DefaultButton>
          </div>
          }

        </div>
      </>
  )
}