import React, {useState, useEffect} from "react";
import { useTransition, animated } from "react-spring";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"

export default function ContentPost({postInfo, AddReply}){

    const [images, setImages] = useState(null);

    function handleReply(replyInfo){
        let index = postInfo.replies.length;
        replyInfo = {...replyInfo, key: index}
        AddReply(postInfo.key, replyInfo)
        //setReplies([...replies, replyInfo])
    }
    
    // grab random images from picsum
    async function LoadData(){
        let response = await fetch('https://picsum.photos/v2/list')
        let responseJSON = await response.json();

        setImages(responseJSON);

        return;
    }
    
    useEffect(() =>{
        LoadData();
    }, [])
    
    function loadedImages(num){
        return images ?
            <img className="media" src={images[num].download_url}/> :
            <div className="media-loading"></div>
    }
    
    const repliesJSX = postInfo.replies.map(elem => reply(elem)); 

    // COMPONENT
    function personDetails(){
        return (
            <div className="person-detail-flex">
                <div className="person-detail-image">
                    {postInfo.isUsingStock? loadedImages(postInfo.pfpNum) : <img src={postInfo.pfp} />}
                </div>
                <div className="person-detail-info">
                    <div className="post-author">{postInfo.author} <IconComponents.Checkmark/> </div>
                    <div className="post-time">{postInfo.time}</div>
                </div>
            </div>
        )
    }

    // COMPONENT
    function post(){
        return (
            <div className="post">
                {postInfo.content && <div className="post-content">{postInfo.content}</div>}
                {postInfo.media && loadedImages(postInfo.media)}
            </div>
        )
    }

    // COMPONENT REFERENCED BY interaction
    function reply(info){
        return (
            <div className="reply" key={info.key}>
                <div className="reply-profile-img">{loadedImages(info.pfp)}</div>
                <div>
                    <div className="reply-profile-content">
                        <div className="reply-profile-name">{info.author}</div>
                        <div className="reply-profile-reply">{info.content}</div>
                    </div>

                    <div className="reply-stats">
                        <div className="reply-time">{info.time}</div>
                        <div className="reply-likes"><IconComponents.ThumbUpIcon/> {info.likes}</div>
                    </div>
                </div>
            </div>
        )
    }

    // COMPONENT
    function interaction(){
        const [isCommenting, setCommentingStatus] = useState(false, [])
        
        function handleComment(e){
            setCommentingStatus((oldVal) => !oldVal)
        }
        
        return (
            
            <div className="post-interaction">
                <div className="interaction-stats">
                    <div><IconComponents.ThumbUpIcon/> {postInfo.likes} Likes</div>
                    <div>{postInfo.comments} Comment(s)  ·  {postInfo.shares} Shares</div>
                </div>

                <div className="interaction-prompt">
                    <div className="add-like"><IconComponents.ThumbUpIcon/> Like</div>
                    <div className="add-comment" onClick={handleComment}><IconComponents.ChatBubbleIcon/> Comment </div>
                    <div className="share"><IconComponents.ArrowIcon/> Share </div>
                </div>

                {isCommenting && <ContentComment handleReply ={handleReply} loadedImages = {loadedImages}/>}

                { postInfo.replies.length > 0 &&
                    <div className="replies">
                        <div className="most-relevant">Most relevant  <IconComponents.ExpandDownIcon/></div>

                        {repliesJSX}
                    </div>
                }
                
            </div>
        )
    }

    return (
        <div className="content-post">
            {personDetails()}
            {post()}
            {interaction()}
        </div>
    )
}