import React from "react";
import { useState, useEffect} from "react"
import {useTransition, animated} from "react-spring"

import Buttons from "../../Buttons/Buttons";

export default function commentBox(props){

    const [isEmpty, setEmptyStatus] = useState(false, [])
    const transition = useTransition(isEmpty, {
        from: {opacity: 0, y: "-1ch"},
        enter: {opacity: 1, y: "0"},
        leave: {opacity: 0}
    })
    
    var myPfp = 7;

    function handleSubmit(e){
        e.preventDefault()
        let commentBox = e.target.elements["textarea"]

        if(commentBox.value.length == 0){
            setEmptyStatus(true)
            return;
        }
        else{
            setEmptyStatus(false)
            
            let replyInfo = {
                author: "Ahmed",
                pfp: myPfp,
                content: commentBox.value,
                time: "just now", likes: "0"
            }

            commentBox.value = "";
            
            props.handleReply(replyInfo)
        }

    }

    return (
        <div className="comment-box">
            <div className="reply-profile-img">{props.loadedImages(myPfp)}</div>
            <form onSubmit={handleSubmit} className="comment-form">
                {transition((style, item) => (
                    item && <animated.div className="empty-prompt" style={style}> Please write something</animated.div>
                ))}
                <textarea name="textarea" placeholder="Enter comment here..."/>
                <Buttons.SubmitButton width="10em"/>
            </form>
        </div>
    )
}