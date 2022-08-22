import React from "react";
import { useEffect, useState, useContext } from "react";
import Backgrounds from "../../backgrounds/Backgrounds";
import { MediaContext } from "../../Contexts/MediaContext";
import "./welcome.css"
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export default function Welcome(){

  const {isTablet} = useContext(MediaContext)
  const [isValid, setIsValid] = useState(true)

  const navigate = useNavigate()
  
  useEffect(() => {
    document.body.style.background = isTablet ? Backgrounds.LoginBackgroundMobile() : Backgrounds.LoginBackground()

    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"

    return () => {
      document.body.style.background = ""
    }
  }, [isTablet])

  useEffect(() => {
    // check if there is a user logged in 

    // check if there is a token
    if (!localStorage.getItem("userToken")){
      navigate("/")
      return;
    }

    async function checkNewUser(){
      try{
        let userStatus = await fetch(` /api/users/login`, {
          method: "GET",
          headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
        })

        let statusJson = await userStatus.json()
        console.log(statusJson.is_set_up)

        if([403, 500].includes(userStatus.status) || statusJson.is_set_up){
          navigate("/", {replace: true})
          return;
        }

      }
      catch(err){
        console.log(err)
      }
    }
    

    checkNewUser()
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    let {f_name, l_name, user_pfp} = e.target.elements
    if(!user_pfp.files.length){
      console.log("no file")
      return;
    }
    if(!f_name.value && !l_name.value){
      setIsValid(false)
      f_name.addEventListener("input", () => {
        setIsValid(true)
      }, {once: true})

      l_name.addEventListener("input", () => {
        setIsValid(true)
      }, {once: true})
    }
    else{
      (async () => {
        try{
          let response = await fetch(` /api/users/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            },
            body: JSON.stringify({
              f_name : f_name.value, l_name: l_name.value, is_set_up: true
            })
          })

          let username = (await response.json()).username
          
          // do query for pfp
          const imagesForm = new FormData();
          imagesForm.append("image", user_pfp.files[0])
          
          await fetch(` /api/users/uploads?type=user_pfp`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            },
            body: imagesForm
          })
          
          window.location.href = `/users/${username}/home`
        }
        catch(err){
          console.log(err)
        }
      })()
    }
  }

  return(
    <div className="welcome-page-container">
      <div className="welcome-box">
        <h1 className="welcome-header"> Welcome to the best social media app!</h1>
        <div className="welcome-text"> lets get some things sorted before you can begin using this app</div>

        <form className="welcome-prompts" onSubmit={handleSubmit}>
          <div className="name-prompt">
            <div className="form-entry">
                <label htmlFor="f_name">
                  <div>First Name(s)</div>
                  
                </label>
                <input max={20} id="f_name" name="f_name" type="text" placeholder="First Name(s)"/>
              </div>
              <div className="form-entry">
                <label htmlFor="l_name">
                  <div>Last name</div>
                </label>
                  <input max={20} id="l_name" name="l_name" type="text" placeholder="Last Name"/>
              </div>
          </div>

          <div className="form-entry">
            <label htmlFor="image-upload">Profile Image</label>
            <input id="image-upload" name="user_pfp" type="file" accept=".png, .jpg, .jpeg"/>
          </div>

          <Buttons.DefaultButton height="3em" width="80%" contentColor="white" submit={true}>
            Continue
          </Buttons.DefaultButton>

          <Buttons.UnderlineButton contentColor="lightslategray" fontSize="0.9rem">Skip</Buttons.UnderlineButton>
        </form>
      </div>

    </div>
  )
}