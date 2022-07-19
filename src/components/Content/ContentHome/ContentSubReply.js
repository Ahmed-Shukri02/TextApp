import React from "react";
import { useState, useEffect } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";

export default function SubReply({info, loadedImages, handleLike, handleSubcomment}){
    
    const [isLiked, setLikedStatus] = useState(false)
    const [isReplyingTo, setReplyToStatus] = useState(false)

    function LikeReply(){
        handleLike(info, isLiked)
        setLikedStatus((oldVal) => !oldVal)
    }

    function ToggleReplyTo(){
        setReplyToStatus((oldVal) => !oldVal)
    }

    const replyToStats = {
        isReplying: true,
        toInfo: info,
        parentKey: info.parentKey,
        type: "subcomment",
        referenceType: info.type,
        repliesTo : null
    }
    
    return (
        <div className="reply-container">
            <div className="reply" key={info.key}>
                <div className="reply-profile-img">{loadedImages(info.pfp)}</div>
                <div>
                    <div className="reply-to"><IconComponents.ReturnUpForwardIcon/> <span style={{fontWeight: "bold"}}>{info.toInfo.author}</span>: {info.toInfo.content}</div>
                    
                    <div className="reply-profile-content">
                        <div className="reply-profile-name">{info.author}</div>
                        <div className="reply-profile-reply">{info.content}</div>
                    </div>
                    <div className="reply-stats">
                        <div className="reply-time">{info.time}</div>
                        <div className="reply-likes" onClick={LikeReply}>
                            {isLiked ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {info.likes}
                        </div>
                        <div className="reply-to" onClick={ToggleReplyTo}>Reply</div>
                    </div>
                </div>
            </div>

            {isReplyingTo && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} replyToStats = {replyToStats}/>}
        </div>
    )
}