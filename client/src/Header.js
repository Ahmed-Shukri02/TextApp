import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInContext } from "./Contexts/UserLoginStatus";
import "./index-style.css"
import Buttons from "./components/Buttons/Buttons"

export default function Header(){
  let {getLoggedInStatus, getUserID} = useContext(LoggedInContext)
  const [loggedInState, setLoggedInState] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    async function checkLoggedIn(){
      setLoggedInState(await getLoggedInStatus())
    }
    checkLoggedIn()
  }, [])

  function handleLogInOut(e){
    if(loggedInState){
      // logout
      localStorage.removeItem("userToken")
      window.location.href = "/login"
    }
    else{
      // login
      window.location.href = "/login"
    }
  }

  async function navigateHome(){
    if(loggedInState){
      let username = (await getUserID()).username
      window.location.href = `/users/${username}/home`
      return;
    }
    else{
      window.location.href = "/login"
    }
  }

  return (
    <div className="header-container">
      <header className="Header">
      <div className="name">textApp</div>
      <nav>
        <ul>
          <li><Buttons.DefaultButton theme="white" handleClick={() => navigateHome()}> Home </Buttons.DefaultButton></li>
          <li><Buttons.DefaultButton theme="white" handleClick={() => {window.location.href = "/feed"}}>My Feed</Buttons.DefaultButton></li>
          <li>
            <Buttons.DefaultButton theme="white" handleClick={handleLogInOut}> {loggedInState ? "Logout" : "Login"} </Buttons.DefaultButton>
          </li>
        </ul>
      </nav>
    </header>
    </div>

  )
}
