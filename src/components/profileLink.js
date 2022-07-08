import React from "react";
import Cube from "../icon-components/cube-outline";
import Open from "../icon-components/open-outline";

export default function profileLink(){
    return(
        <div className="profile-link">
            <button className="profile-link-button">
                <Cube />
                <span> Use App</span>
            </button>
            <div className="website-link">
                <span><Open/></span> 
                <span> Instagram.com </span>
            </div>
        </div>
    )
}