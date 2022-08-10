import React, { useId } from "react";
import ContentLeft from "./ContentLeft";
import ContentRight from "./ContentRight";

export default function ContentHome({userInfo, token}){
  
  return (
    <div className="content content-home">
      <ContentRight userInfo={userInfo} token={token}/>
    </div>
  )
}