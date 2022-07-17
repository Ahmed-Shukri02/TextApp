import React from "react";
import ContentPost from "./ContentPost";
import instaProfile from "../../../images/insta-profile.jpg"

export default function ContentRight(){
    const postInfo = {
        author: "Instagram", time: "21 hrs",
        pfp: instaProfile,
        media : 20, // give number for picsum or null
        content: "Back at it with Tips n Tricks — this time about how to up your Feed game",
        likes: 922, comments: 355, shares: 27,
    }
    
    return (
        <div className="content-home-right">
            <ContentPost postInfo = {postInfo}/>
        </div>
    )
}