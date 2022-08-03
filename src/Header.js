import React from "react";
import { Link } from "react-router-dom";
import "./index-style.css"

export default function Header(){
  return (
    <div className="header-container">
      <header className="Header">
      <h1 className="name">Ahmed</h1>
      <nav>
        <ul>
          <li><a href="/adfdafa">Home</a></li>
          <li>About</li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
    </div>

  )
}
