import React from "react";
import ContentLeft from "./ContentLeft";
import ContentRight from "./ContentRight";

export default function ContentHome(){
  return (
    <div className="content content-home">
      <ContentLeft/>
      <ContentRight/>
    </div>
  )
}