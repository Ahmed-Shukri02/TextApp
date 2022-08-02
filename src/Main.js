import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import User from "./components/User";
import Login from "./components/LoginPage/Login";
import { MediaContext } from "./Contexts/MediaContext";
import { useMediaQuery } from "react-responsive";


export default function Main(){
  
  const isMobile = useMediaQuery({query: "(max-width: 650px)"})
  
  return (
    <MediaContext.Provider value={{isMobile}}>
      <Routes>
        <Route path="users/:id/*" element={<User/>} />
        <Route path="login" element={<Login/>}/>
      </Routes>
    </MediaContext.Provider>
  )
}