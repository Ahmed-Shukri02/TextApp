import React from "react";
import IconComponents from "../icon-components/icon-components";

export default function profileLink(){
    return(
        <div className="profile-link">
            <button className="profile-link-button">
                <IconComponents.Cube />
                <span> Use App</span>
            </button>
            <div className="website-link">
                <span><IconComponents.OpenOutline/></span> 
                <span> Instagram.com </span>
            </div>
        </div>
    )
}