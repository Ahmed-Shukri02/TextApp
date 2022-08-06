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
      navigate("/login")
    }
    else{
      // login
      navigate("/login")
    }
  }

  async function navigateHome(){
    if(loggedInState){
      let username = (await getUserID()).username
      navigate(`/users/${username}/home`)
      navigate(0)
      //navigate(0)
      return;
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div className="header-container">
      <header className="Header">
      <h1 className="name">Ahmed</h1>
      <nav>
        <ul>
          <li><Buttons.DefaultButton theme="white" handleClick={() => navigateHome()}> Home </Buttons.DefaultButton></li>
          <li>About</li>
          <li>
            <Buttons.DefaultButton theme="white" handleClick={handleLogInOut}> {loggedInState ? "Logout" : "Login"} </Buttons.DefaultButton>
          </li>
        </ul>
      </nav>
    </header>
    </div>

  )
}
