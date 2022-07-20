import React from "react";
import { useState, useEffect } from "react";
import ContentPost from "./ContentPost";
import instaProfile from "../../../images/insta-profile.jpg"

export default function ContentRight(){
    
    const [posts, setPosts] = useState([])

    function AddReply(key, replyInfo){
        let newPosts = [...posts] // creating deep copy of posts
        newPosts[key].replies = [...newPosts[key].replies, replyInfo]
        newPosts[key].comments ++;
        
        setPosts(newPosts)
    }

    function AddReplyTo(postKey, replyInfo){
        let newPosts = [...posts]
        let repliesTo = newPosts[postKey].replies[replyInfo.parentKey].repliesTo
        newPosts[postKey].replies[replyInfo.parentKey].repliesTo = [...repliesTo, replyInfo]
        //newPosts[postKey].comments ++;
        
        setPosts(newPosts)
    }


    function handleReplyLike(replyInfo, postKey, isLiked){
        let newPosts = [...posts]
        let reply = replyInfo.type == "comment" ? newPosts[postKey].replies[replyInfo.key] : newPosts[postKey].replies[replyInfo.parentKey].repliesTo[replyInfo.key]

        
        reply.likes = isLiked? parseInt(reply.likes) - 1 : parseInt(reply.likes) + 1
        
        setPosts(newPosts)
    }
    
    const postInfo = {
        key: 0,
        author: "Instagram", time: "21 hrs",
        isUsingStock: false,
        pfp: instaProfile,
        media : 20, // give number for picsum or null
        content: "Back at it with Tips n Tricks — this time about how to up your Feed game",
        likes: 922, comments: 1, shares: 27,
        replies: [
            {
                key: 0,
                author: "very unhappy person",
                pfp: 9,
                content: "Fix your app",
                time: "14 hrs", likes: "4",
                type: "comment",
                parentKey: 0,
                isReplying: false,
                toInfo: null,
                referenceType: null,

                repliesTo: [

                ]
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
        likes: 12, comments: 0, shares: 3,
        replies: [

        ]
    }


    const postInfo3 ={
        key: 2,
        author: "Bro", time: "5 mins",
        isUsingStock: true,
        pfpNum: 25,
        media: 26,
        content: "first time using this app. Hello everyone!",
        likes: 0, comments: 0, shares: 0,
        replies : [

        ]
    }

    useEffect(() =>{
        setPosts([postInfo, postInfo2, postInfo3])
    }, [])
    
    const postsJSX = posts.map(elem => <ContentPost postInfo={elem} AddReply = {AddReply} AddReplyLike={handleReplyLike} AddReplyTo = {AddReplyTo}/>)

    return (
        <div className="content-home-right">
            {postsJSX}
        </div>
    )
}