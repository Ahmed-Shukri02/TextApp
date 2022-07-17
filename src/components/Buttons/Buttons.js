import React from "react";
import "./Buttons_style.css";

export default class Buttons{

    static SubmitButton(props){
        
        const style = {
            width: props.width,
            aspectRatio: "5/1",
        }
        
        return(
            <button className="submit-button" type="submit" style={style}>Submit</button>
        )
    }
}