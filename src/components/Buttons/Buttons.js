import React from "react";
import { useState } from "react";
import "./Buttons_style.css";

export default class Buttons{

    static SubmitButton({width, height = null,}){
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

    static DefaultButton({width, height = null, text, handleClick = () => ""}){
        const baseStyle = {
            width: width,
        }
        
        var myStyle
        if(!height) {
            myStyle = {...baseStyle, aspectRatio : "5/1"}
        } else myStyle = {...baseStyle, height: height}
        
        const [style, setStyle] = useState(myStyle)
        
        const mobileStyle = {
            backgroundColor: "#165baf"
        }


        function onClick(e){
            handleClick()
            e.target.blur()
        }

        return (
            <button 
            className="default-button" 
            onClick={onClick} 
            style={style} 
            onTouchStart={() => setStyle({...myStyle, ...mobileStyle})}
            onTouchEnd ={() => setStyle({...myStyle})}>
                {text}
            </button>
        )
    }
}