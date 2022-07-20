import React from "react";
import { useState, useEffect } from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import SubReply from "./ContentSubReply";

export default function Reply({info, loadedImages, handleLike, handleReplyTo}){
    
    const [isLiked, setLikedStatus] = useState(false)
    const [isReplyingTo, setReplyToStatus] = useState(false)
    const [subReplies, setSubReplies] = useState(info.repliesTo)

    function LikeReply(){
        handleLike(info, isLiked)
        setLikedStatus((oldVal) => !oldVal)
    }

    function LikeSubReply(info, isLiked){
        handleLike(info, isLiked)
        
        let newSub = [...subReplies]
        newSub[info.key].likes = isLiked ? parseInt(newSub[info.key].likes) - 1 : parseInt(newSub[info.key].likes) + 1
        
        setSubReplies(newSub)
    }

    function ToggleReplyTo(){
        setReplyToStatus((oldVal) => !oldVal)
    }

    function handleSubcomment(replyInfo){
        replyInfo = {...replyInfo, key: subReplies.length}
        
        handleReplyTo(replyInfo)
        setSubReplies(oldVal => [...oldVal, replyInfo])
    }

    const replyToStats = {
        isReplying: true,
        toInfo: info,
        parentKey: info.parentKey,
        type: "subcomment",
        referenceType: info.type,
        repliesTo : null
    }
    
    const renderCondition = (info.type == "comment" && info.repliesTo.length > 0)
    var repliesToJSX
    if(renderCondition){
        repliesToJSX = subReplies.map((elem) =>
            <div className="sub-replies">
                <SubReply info={elem} loadedImages={loadedImages} handleSubcomment = {handleSubcomment} handleLike={LikeSubReply}/>
            </div>
        )

    }


    return (
        <div className="reply-container">
            <div className="reply" key={info.key}>
                <div className="reply-profile-img">{loadedImages(info.pfp)}</div>
                <div>
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

            {isReplyingTo && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} replyToStats = {replyToStats} closeReply={ToggleReplyTo}/>}

            {renderCondition && <div className="sub-replies-container">{repliesToJSX}</div>}
        </div>
    )
}