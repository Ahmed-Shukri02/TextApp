import React from "react";
import "./Buttons_style.css";

export default class Buttons{

    static SubmitButton({width, height = null,}){
        
        var style = {
            width: width,
        }

        if(!height) {
            style = {...style, aspectRatio : "5/1"}
        } else style = {...style, height: height}
        
        return(
            <button className="submit-button" type="submit" style={style} onClick={(e) => console.log("bluring")}>Submit</button>
        )
    }

    static DefaultButton({width, height = null, text, handleClick = () => ""}){
        var style = {
            width: width,
        }

        if(!height) {
            style = {...style, aspectRatio : "5/1"}
        } else style = {...style, height: height}

        function onClick(e){
            handleClick()
            e.target.blur()
        }

        return (
            <button className="default-button" onClick={onClick} style={style}>{text}</button>
        )
    }
}