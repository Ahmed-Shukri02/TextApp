import React, { useCallback, useEffect, useRef, useState } from "react";
import Buttons from "../Buttons/Buttons";
import "./Inputs_style.css"

  function Number({width = "5em", height = "2em", placeholder = ""}){
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

  function File({accept, name}){
    
    const [inputRef, setInputRef] = useState(null)
    const [customText, setCustomText] = useState("No file selected")
    const inputRefCb = useCallback((node) => {
      if(node){
        node.addEventListener("change", () => handleInputChange(node))
        setInputRef(node)
      }
    }, [])

    useEffect(() => {
      return () => {
        if(inputRef){
          inputRef.removeEventListener("change", handleInputChange)
        }
      }
    }, [])

    function handleInputChange(node){
      console.log("changed")
      console.log(node.files[0].name)
      if(node.files[0]){
        setCustomText(node.files[0].name)
      }
      else{
        setCustomText("No file selected")
      }
    }
    
    return (
      <>
        <input hidden ref={inputRefCb} type="file" name={name} accept={accept}/>


        { inputRef && 
          <div style={{display: "inline-flex", gap: "1em", alignItems: "center"}}>
          <Buttons.DefaultButton handleClick={ () => inputRef.click()} theme="gray" fontSize="0.8rem" >{inputRef.files[0]? "Change File" : "Select File"}</Buttons.DefaultButton>
          <span className="file-custom-text">{customText}</span>
          </div>
        }
      </>
    )
  }

const Inputs = {Number, File}
export default Inputs