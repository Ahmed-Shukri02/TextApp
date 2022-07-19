import React, {useState, useEffect} from "react";
import { useTransition, animated } from "react-spring";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";

export default function ContentPost({postInfo, AddReply, AddReplyTo, AddReplyLike}){

    const [images, setImages] = useState(null);
    const [likes, setLikes] = useState(postInfo.likes);
    const [isLiked, setLikedStatus] = useState(false);

    postInfo.likes = likes;

    function handleLike(){
        setLikes((oldVal) => isLiked? oldVal - 1 : oldVal + 1);
        setLikedStatus((oldVal) => !oldVal);
        return
    }

    function handleReply(replyInfo){
        let index = postInfo.replies.length;
        replyInfo = {...replyInfo, key: index, parentKey: index}
        AddReply(postInfo.key, replyInfo)
        //setReplies([...replies, replyInfo])
    }
    
    function handleReplyLike(info, isLiked){
        AddReplyLike(info, postInfo.key, isLiked);
    }

    function handleReplyTo(replyInfo){
        let index = postInfo.replies[replyInfo.parentKey].repliesTo.length
        replyInfo = {...replyInfo, key: index}

        AddReplyTo(postInfo.key, replyInfo)
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
    
    const repliesJSX = postInfo.replies.map(elem => <Reply info={elem} loadedImages = {loadedImages} handleLike = {handleReplyLike} handleReplyTo = {handleReplyTo}/>); 

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

    // COMPONENT
    function interaction(){
        const [isCommenting, setCommentingStatus] = useState(false, [])

        const replyStats = {
            isReplying: false,
            toInfo: null,
            type: "comment",
            referenceType: null,

            repliesTo : [

            ]
        }
        
        function handleComment(e){
            setCommentingStatus((oldVal) => !oldVal)
        }
        
        return (
            
            <div className="post-interaction">
                <div className="interaction-stats">
                    <div><IconComponents.ThumbUpIcon fill="none"/> {postInfo.likes} Likes</div>
                    <div>{postInfo.comments} Comment(s)  ·  {postInfo.shares} Shares</div>
                </div>

                <div className="interaction-prompt">
                    { isLiked ?
                    <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> Unlike</div> :

                    <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon/> Like</div>
                    }

                    <div className="add-comment" onClick={handleComment}><IconComponents.ChatBubbleIcon/> Comment </div>
                    <div className="share"><IconComponents.ArrowIcon/> Share </div>
                </div>

                {isCommenting && <ContentComment handleReply ={handleReply} loadedImages = {loadedImages} replyToStats = {replyStats}/>}

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