import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index-style.css"
import Buttons from "./components/Buttons/Buttons"
import { useSelector } from "react-redux";

export default function Header(){
  const [loggedInState, setLoggedInState] = useState(null)
  const client = useSelector((state) => state.clientInfo.value? state.clientInfo.value.payload : null)
  
  useEffect(() => {
    setLoggedInState(client ? true : false)
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

  function navigateHome(){
    if(loggedInState){
      let username = client.username
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
          <li><Buttons.DefaultButton theme="white" handleClick={navigateHome}> Home </Buttons.DefaultButton></li>
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
