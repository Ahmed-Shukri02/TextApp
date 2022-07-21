import React from "react";
import ContentComment from "./ContentComment"
import IconComponents from "../../../icon-components/icon-components";
import SubReply from "./ContentSubReply";

export default function Reply({info, loadedImages, handleLike, handleReplyTo, toggleSubComment}){
    
    function LikeReply(){
        handleLike(info, info.userLike)
    }

    function LikeSubReply(info, isLiked){
        handleLike(info, isLiked)
    }

    function ToggleReplyTo(){
        toggleSubComment(info, !info.commentBox);
    }

    function ToggleSubReply(replyInfo){
        toggleSubComment(replyInfo, !replyInfo.commentBox);
    }

    function handleSubcomment(replyInfo){
        replyInfo = {...replyInfo, key: info.repliesTo.length}
        
        handleReplyTo(replyInfo)
    }

    const replyToStats = {
        isReplying: true,
        commentBox: false,
        userLike: false,
        toInfo: info,
        parentKey: info.parentKey,
        type: "subcomment",
        referenceType: info.type,
        repliesTo : null
    }
    
    const renderCondition = (info.type === "comment" && info.repliesTo.length > 0)
    var repliesToJSX
    if(renderCondition){
        repliesToJSX = info.repliesTo.map((elem) =>
            <div className="sub-replies" key={elem.key}>
                <SubReply info={elem} key={elem.key} loadedImages={loadedImages} handleSubcomment = {handleSubcomment} handleLike={LikeSubReply} toggleSubComment={ToggleSubReply}/>
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
                            {info.userLike ? <IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> : <IconComponents.ThumbUpIcon/>} {info.likes}
                        </div>
                        <div className="reply-to" onClick={ToggleReplyTo}>Reply</div>
                    </div>
                </div>
            </div>

            {info.commentBox && <ContentComment loadedImages = {loadedImages} handleReply = {handleSubcomment} replyToStats = {replyToStats} closeReply={ToggleReplyTo}/>}

            {renderCondition && <div className="sub-replies-container">{repliesToJSX}</div>}
        </div>
    )
}