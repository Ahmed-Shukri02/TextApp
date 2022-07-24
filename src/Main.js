import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import User from "./components/User";


export default function Main(){
  return (
    <Routes>
      <Route path="users/:id/*" element={<User/>} />
    </Routes>
  )
}