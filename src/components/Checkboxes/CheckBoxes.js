import "./checkboxes.css"
import React from "react"

export default class CheckBoxes{

  static DefaultCheckbox({children, boxClass, htmlFor, name}){

    return(
      <div className={`checkbox-flex ${boxClass}`}>
        <input id={htmlFor} className="box" name={name} type="checkbox"/>
        <label className="disable-select" style={{position: "relative"}} htmlFor={htmlFor}>{children}</label>
      </div>
    )
  }
}