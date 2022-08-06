import React from "react";
import ContentReviewLeft from "./ContentReviewLeft";
import ContentReviewRight from "./ContentReviewRight";

export default function ContentReview(){
  return (
    <div className="content content-review">
      <ContentReviewLeft/>
      <ContentReviewRight/>
    </div>
  )
}