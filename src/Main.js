import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import User from "./components/User";
import Login from "./components/LoginPage/Login";
import { MediaContext } from "./Contexts/MediaContext";
import { useMediaQuery } from "react-responsive";
import Home from "./components/HomePage/Home";
import Welcome from "./components/WelcomePage/Welcome";


export default function Main(){
  
  const isMobile = useMediaQuery({query: "(max-width: 650px)"})
  const isTablet = useMediaQuery({query: "(max-width: 1000px)"})
  
  return (
    <MediaContext.Provider value={{isMobile, isTablet}}>
      <Routes>
        <Route path="users/:id/*" element={<User/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="welcome" element={<Welcome/>}/>
      </Routes>
    </MediaContext.Provider>
  )
}