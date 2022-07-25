import React, { useId } from "react";
import ContentLeft from "./ContentLeft";
import ContentRight from "./ContentRight";

export default function ContentHome({userInfo}){
  
  return (
    <div className="content content-home">
      <ContentLeft userInfo={userInfo}/>
      <ContentRight userInfo={userInfo}/>
    </div>
  )
}