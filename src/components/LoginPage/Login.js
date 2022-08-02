import React, { useContext, useEffect } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import { MediaContext } from "../../Contexts/MediaContext";
import IconComponents from "../../icon-components/icon-components";
import Buttons from "../Buttons/Buttons";
import "./login.css"

export default function Login(){

  const {isMobile} = useContext(MediaContext)

  useEffect(() => {
    document.body.style.background = Backgrounds.LoginBackground()
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"
  }, [])


  function signIn(){

    return (
      <>
        <div className="sign-in">
          Sign-In
        </div>

        <div className="sign-in-details-container">
          <form className="sign-in-details">
            <div className="form-email">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Email Address"/>
            </div>
            <div className="form-password">
              <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Buttons.DefaultButton height="3em" width="80%" contentColor="white">
                Login
              </Buttons.DefaultButton>
            </div>

            <div className="login-help">
              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem">Can't Log In?</Buttons.UnderlineButton>

              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem">New User?</Buttons.UnderlineButton>
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

  function signUp(){

    return(
      <>
        <div className="sign-in">
          Sign-Up
        </div>

        <div className="sign-in-details-container">
          <form className="sign-in-details">
            <div className="form-entry">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" placeholder="Username"/>
            </div>
            <div className="form-entry">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Email Address"/>
            </div>
            <div className="form-entry">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password"/>
            </div>
            <div className="form-entry">
              <label htmlFor="password-repeat">Re-Enter Password</label>
              <input id="password-repeat" name="passwordRepeat" type="password"/>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
              <Buttons.DefaultButton height="3em" width="80%" contentColor="white">
                Sign Up
              </Buttons.DefaultButton>
            </div>

            <div className="login-help">
              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem">Already have an account?</Buttons.UnderlineButton>
            </div>
          </form>

        </div>
      </>
    )
  }

  return(
    <div className="login-page-container">
      <div className="login-container">
        {signUp()}
      </div>
    </div>
  )
}