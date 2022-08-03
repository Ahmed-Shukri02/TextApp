import React, { useEffect, useState, useRef } from "react";
import Buttons from "../Buttons/Buttons";
import CheckBoxes from "../Checkboxes/CheckBoxes";
import { useContext } from "react";
import { MediaContext } from "../../Contexts/MediaContext";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";


export default function SignUp({setIsLogin}){

  const {isMobile} = useContext(MediaContext)

  const [usernameIsEmpty, setUsernameIsEmpty] = useState(false)
  const[emailValidated, setEmailValidation] = useState(true)
  const[emailIsEmpty, setEmailIsEmpty] = useState(false)
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)
  const [passwordMatches, setPasswordMatch] = useState(true)
  const [boxAccepted, setBoxAccepted] = useState(true)

  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const passwordRepeat = useRef(null)

  const navigate = useNavigate()

  function handleEmailInput(){
    let emailMatch = emailInput.current.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    
    setEmailValidation(emailMatch ? true : false)

  }

  function handlePasswordRepeatInput(){
    if(passwordInput.current.value === passwordRepeat.current.value){
      setPasswordMatch(true)
    }
    else{
      setPasswordMatch(false)
    }

  }

  function emailValidationMessage(){
    if(emailIsEmpty){
      return <div className="invalidated">Field is Empty</div>
    }
    else if (!emailValidated){
      return <div className="invalidated">Invalid Email</div>
    }
    else{ return }
  }

  useEffect(() => {
    emailInput.current.addEventListener("input", handleEmailInput)
    passwordRepeat.current.addEventListener("input", handlePasswordRepeatInput)

    return () => {
      emailInput.current && emailInput.current.removeEventListener("input", handleEmailInput)

      passwordRepeat.current && passwordRepeat.current.removeEventListener("input", handlePasswordRepeatInput)
    }

  }, [])

  function handleSignUp(e){
    e.preventDefault()

    let {username, email, password, terms} = e.target.elements

    if(!username.value){
      setUsernameIsEmpty(true)
      username.addEventListener("input", () => {
        setUsernameIsEmpty(false)
      }, {once: true})
    }
    if(!email.value){
      setEmailIsEmpty(true)
      email.addEventListener("input", () => {
        setEmailIsEmpty(false)
      }, {once: true})
    }
    if(!password.value){
      setPasswordIsEmpty(true)
      password.addEventListener("input", () => {
        setPasswordIsEmpty(false)
      }, {once: true})
    }

    if(!terms.checked){
      setBoxAccepted(false)
      terms.addEventListener("change", () => {
        setBoxAccepted(true)
      }, {once: true})
    }

    (async () => {
      try{
        let submitCondition = (username.value && email.value && password.value && emailValidated && passwordMatches && terms.checked)
  
      if(submitCondition){
        let response = await fetch(`http://localhost:5000/api/users`, {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({username: username.value, email: email.value, password: password.value})
        })
  
        let newUserInfo = await response.json()
        console.log(newUserInfo)

        navigate("/welcome")
      }
      }
      catch(err){
        console.log(err)
      }
    })()

  }

  return(
    <>
        <div className="sign-in">
          Sign-Up
        </div>

        <div className="sign-in-details-container">
          <form className="sign-in-details" onSubmit={handleSignUp}>
            <div className="form-entry">
              <label htmlFor="username">
                Username
                <div>
                  {usernameIsEmpty && <div className="invalidated">Field is Empty</div>}
                </div>
              </label>
              <input max={20} id="username" name="username" type="text" placeholder="Username"/>
            </div>
            <div className="form-entry">
              <label htmlFor="email">
                <div>Email</div>
                {(emailIsEmpty || !emailValidated) && <div>{emailValidationMessage()}</div>}
              </label>
              <input ref={emailInput} id="email" name="email" type="email" placeholder="Email Address"/>
            </div>
            <div className="form-entry">
              <label htmlFor="password">
                Password
                <div>
                  {passwordIsEmpty && <div className="invalidated">Field is Empty</div>}
                </div>
              </label>
              <input ref={passwordInput} max={30} id="password" name="password" type="password"/>
            </div>
            <div className="form-entry">
              <label htmlFor="password-repeat">
                Re-Enter Password
                <div>
                  {!passwordMatches && <div className="invalidated">Passwords do not match</div>}
                </div>
              </label>
              <input ref={passwordRepeat} max={30} id="password-repeat" name="passwordRepeat" type="password"/>
            </div>

            <div>
              {!boxAccepted && <div className="invalidated">Please accept the Terms and Conditions </div>}

              <CheckBoxes.DefaultCheckbox boxClass="t-and-c" htmlFor="terms" name="terms">I agree with the terms and conditions</CheckBoxes.DefaultCheckbox>
            </div>
            
            <div style={{display: "flex", justifyContent: "center"}}>
              <Buttons.DefaultButton submit={true} height="3em" width="80%" contentColor="white">
                Sign Up
              </Buttons.DefaultButton>
            </div>


            <div className="login-help">
              <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem" handleClick={() => setIsLogin(true)}>Already have an account?</Buttons.UnderlineButton>
            </div>

          </form>

        </div>
      </>
  )
}