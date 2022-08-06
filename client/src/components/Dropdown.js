import React, { useState } from "react";

export default function DropDown(props){
  
  const [click, setClick] = useState(false);

  const onHoverIn = () => setClick(true);
  const onHoverOut = () => setClick(false);
  
  return(
    <div
    onMouseEnter={onHoverIn}
    onMouseLeave={onHoverOut}
    className={props.className}>
      
      <div className="dropdown-selection"> {props.info.content} </div>
      {click && props.info.dropDown}

    </div>
  )
}