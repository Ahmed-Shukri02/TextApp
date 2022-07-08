import React from "react";
import "./index-style.css"

export default function Header(){
    return (
        <div className="header-container">
            <header className="Header">
            <h1 className="name">Ahmed</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Login</li>
                </ul>
            </nav>
        </header>
        </div>

    )
}
