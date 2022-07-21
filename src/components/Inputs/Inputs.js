import React from "react";
import "./Inputs_style.css"

export default class Inputs{


    static Number({width = "5em", height = "2em", placeholder = ""}){
        var style = {
            width: width,
            height: height
        }

        function myFocus(e){
            e.target.addEventListener("mousewheel", () => e.target.blur(), {passive: true})
        }
        


        return (
            <input className="number-input" type="number" placeholder={placeholder} style={style} onFocus={(e) => myFocus(e)}></input>
        )

    }

}