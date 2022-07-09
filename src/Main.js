import React from "react";
import "./index-style.css";
import "./components/Content/Content.css";
import ProfileCard from "./components/ProfileCard";
import ContentLeft from "./components/Content/ContentLeft";
import ContentRight from "./components/Content/ContentRight";


export default function Main(){

    return (
        <div className="main-container">
            <ProfileCard/>

            <div className="content-container">
                <div className="content">
                    <ContentLeft/>
                    <ContentRight/>
                </div>
            </div>
            
        </div>
    )
}