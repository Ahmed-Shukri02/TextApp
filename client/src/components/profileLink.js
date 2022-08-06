import React from "react";
import IconComponents from "../icon-components/icon-components";
import Buttons from "./Buttons/Buttons";

export default function profileLink(){
  return(
    <div className="profile-link">
      <Buttons.DefaultButton width="90%" height="2em" contentColor="white" fontSize="0.9rem">
        <div style={{display: "flex", alignItems: "center", gap: "0.5em", justifyContent: "center"}}>
          <IconComponents.BellIcon/>
          <span> Follow </span>
        </div>
      </Buttons.DefaultButton>
      <div className="website-link">
        <span><IconComponents.OpenOutline/></span> 
        <span> Instagram.com </span>
      </div>
    </div>
  )
}