import React from "react";
import { useState, useEffect } from "react";
import ContentPost from "./ContentPost";
import instaProfile from "../../../images/insta-profile.jpg"

export default function ContentRight(){
    
    const [posts, setPosts] = useState([])

    function AddReply(key, replyInfo){
        let newPosts = [...posts] // creating deep copy of posts
        newPosts[key].replies = [...newPosts[key].replies, replyInfo]
        
        setPosts(newPosts)
    }
    
    const postInfo = {
        key: 0,
        author: "Instagram", time: "21 hrs",
        isUsingStock: false,
        pfp: instaProfile,
        media : 20, // give number for picsum or null
        content: "Back at it with Tips n Tricks — this time about how to up your Feed game",
        likes: 922, comments: 355, shares: 27,
        replies: [
            {
                key: 0,
                author: "very unhappy person",
                pfp: 9,
                content: "Fix your app",
                time: "14 hrs", likes: "4"
            },

            {
                key: 1,
                author: "Ahmed",
                pfp: 7,
                content: "Fix your attitude",
                time: "13 hrs", likes: "25"
            }
        ]
    }

    const postInfo2 = {
        key: 1,
        author: "Ahmed", time: "10 mins",
        isUsingStock: true,
        pfpNum: 7,
        media : null, // give number for picsum or null
        content: "Man that unhappy dude is really a jerk",
        likes: 12, comments: 1, shares: 3,
        replies: [

        ]
    }

    useEffect(() =>{
        setPosts([postInfo, postInfo2])
    }, [])
    
    const postsJSX = posts.map(elem => <ContentPost postInfo={elem} AddReply = {AddReply}/>)

    return (
        <div className="content-home-right">
            {postsJSX}
        </div>
    )
}