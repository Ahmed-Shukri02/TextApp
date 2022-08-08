import React, { useEffect, useRef, useState } from "react";
import Buttons from "../Buttons/Buttons";
import {useNavigate} from "react-router-dom"
import IconComponents from "../../icon-components/icon-components";
import { useContext } from "react";
import { MediaContext } from "../../Contexts/MediaContext";

export default function SignIn({setIsLogin}){

  let navigate = useNavigate()
  
  const {isMobile} = useContext(MediaContext)
  const emailInput = useRef(null)

  const[emailValidated, setEmailValidation] = useState(true)
  const[emailIsEmpty, setEmailIsEmpty] = useState(false)
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)

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
            <Buttons.DefaultButton theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.GoogleIcon iconClass="login-button-icons"/>
                Continue with Google
              </div>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.FaceBookIcon iconClass="login-button-icons" color="#1B74E4"/>
                Continue with Facebook
              </div>
            </Buttons.DefaultButton>
            <Buttons.DefaultButton theme="gray" height="3.5em">
              <div className="login-button-flex">
                <IconComponents.LinkedInIcon iconClass="login-button-icons" color="#1B74E4"/>
                Continue with LinkedIn
              </div>
            </Buttons.DefaultButton>
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