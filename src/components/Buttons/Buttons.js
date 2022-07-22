import React from "react";
import { useState } from "react";
import "./Buttons_style.css";

export default class Buttons{

  static SubmitButton({width = "auto", height = null,}){
    const baseStyle = {
      width: width,
    }
    
    var myStyle
    if(!height) {
      myStyle = {...baseStyle, aspectRatio : "5/1"}
    } else myStyle = {...baseStyle, height: height}

    const [style, setStyle] = useState(myStyle)

    const mobileStyle = {
      backgroundColor: "lightgray",
    }
    
    return(
      <button 
      className="submit-button" 
      type="submit" 
      style={style} 
      onTouchStart={() => setStyle({...myStyle, ...mobileStyle})}
      onTouchEnd ={() => setStyle({...myStyle})}>
        Submit
      </button>
    )
  }

  static DefaultButton({children, width = "auto", height = null, theme= "blue", fontSize="1rem", contentColor="black", handleClick = () => ""}){
    const baseStyle = {
      width: width,
      fontSize: fontSize,
      color: contentColor
    }
    
    var myStyle
    if(!height) {
      myStyle = {...baseStyle, aspectRatio : "5/1"}
    } else myStyle = {...baseStyle, height: height}
    
    const [style, setStyle] = useState(myStyle)
    
    var mobileStyle = {
      backgroundColor: null
    }
    
    mobileStyle.backgroundColor = function(){
      switch(theme){
        case "blue" : return "#165baf";
        case "white": return "lightgray"
      }
    }()

    function onClick(e){
      handleClick()
      e.target.blur()
    }

    return (
      <button 
      className= {"default-" + theme}
      onClick={onClick} 
      style={style} 
      onTouchStart={() => setStyle({...myStyle, ...mobileStyle})}
      onTouchEnd ={() => setStyle({...myStyle})}>
        {children && children}
      </button>
    )
  }
}