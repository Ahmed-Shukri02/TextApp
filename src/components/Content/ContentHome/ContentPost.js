import React, {useState, useEffect} from "react";
import { useTransition, animated } from "react-spring";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";
import Buttons from "../../Buttons/Buttons";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import Inputs from "../../Inputs/Inputs";

export default function ContentPost({postInfo, AddReply, AddReplyTo, AddReplyLike}){

    const [images, setImages] = useState(null);
    const [likes, setLikes] = useState(postInfo.likes);
    const [isLiked, setLikedStatus] = useState(false);

    postInfo.likes = likes;

    /*
    =============================================================
        COMMENT FEATURES
    =============================================================
    */

    // comments
    function handleLike(){
        setLikes((oldVal) => isLiked? oldVal - 1 : oldVal + 1);
        setLikedStatus((oldVal) => !oldVal);
        return
    }

    function handleReply(replyInfo){
        let index = postInfo.replies.length;
        replyInfo = {...replyInfo, key: index, parentKey: index}
        AddReply(postInfo.key, replyInfo)
    }
    
    // sub comments
    function handleReplyLike(info, isLiked){
        AddReplyLike(info, postInfo.key, isLiked);
    }

    function handleReplyTo(replyInfo){
        let index = postInfo.replies[replyInfo.parentKey].repliesTo.length
        replyInfo = {...replyInfo, key: index}

        AddReplyTo(postInfo.key, replyInfo)
    }

    /*
    =============================================================
        HANDLE STOCK IMAGES
    =============================================================
    */
    
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

    /*
    =============================================================
        COMPONENTS
    =============================================================
    */
    
    const repliesJSX = postInfo.replies.map(elem => <Reply info={elem} loadedImages = {loadedImages} handleLike = {handleReplyLike} handleReplyTo = {handleReplyTo}/>);
    
    repliesJSX.reverse()

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
        const [commentsLength, setCommentsLength] = useState(1)

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
        
        function seeMore(num){
            // check if comments + 2 is larger than the available comments. If so, set the commentslength to max available comments
            let newVal = commentsLength + num > postInfo.replies.length ? postInfo.replies.length : commentsLength + num;
            setCommentsLength(newVal)
        }

        function seeNmore(e){
            e.preventDefault()

            let input = e.target.querySelector("input");
            seeMore(parseInt(input.value))
            
            input.value = ""
        }

        return (
            
            <div className="post-interaction">
                <div className="interaction-stats">
                    <div><IconComponents.ThumbUpIcon fill="none"/> {postInfo.likes} Likes</div>
                    <div>{postInfo.comments} {postInfo.comments == 1 ? "Comment" : "Comments"}  ·  {postInfo.shares} Shares</div>
                </div>

                <div className="interaction-prompt">
                    { isLiked ?
                    <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon fill="#1B74E4" stroke="black"/> Unlike</div> :

                    <div className="add-like" onClick={handleLike}><IconComponents.ThumbUpIcon/> Like</div>
                    }

                    <div className="add-comment" onClick={handleComment}><IconComponents.ChatBubbleIcon/> Comment </div>
                    <div className="share"><IconComponents.ArrowIcon/> Share </div>
                </div>

                {isCommenting && <ContentComment handleReply ={handleReply} loadedImages = {loadedImages} replyToStats = {replyStats} closeReply={() => "" /* Do nothing */}/>}

                { postInfo.replies.length > 0 &&
                    <div className="replies">
                        <div className="most-relevant">Most relevant  <IconComponents.ExpandDownIcon/></div>
                        {repliesJSX.slice(0, commentsLength)}

                        <div className="comments-displaying"> 
                            Displaying <span>{commentsLength} out of {postInfo.replies.length}</span> comments
                        </div>

                        <div className="see-more-container">
                            <div className="see-more-less">
                                {commentsLength < postInfo.replies.length && <Buttons.DefaultButton width="7em" text="See more" handleClick={() => seeMore(2)}/>}
                                {commentsLength > 1 && <Buttons.DefaultButton width="7em" text="Collapse" handleClick={() => setCommentsLength(1)}/>}
                            </div>
                            <div className="see-n-more">
                                {commentsLength < postInfo.replies.length && (
                                    <div style={{display: "flex", flexDirection: "row", gap: "0.5em", alignItems: "center"}}>
                                        <span>See # more: </span>
                                        <form onSubmit={seeNmore}>
                                            <Inputs.Number />
                                            <Buttons.DefaultButton width="3em" height="2em" text= "#"/>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

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