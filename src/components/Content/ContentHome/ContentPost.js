import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import React, {useState, useEffect} from "react";
import IconComponents from "../../../icon-components/icon-components"
import profile from "../../../images/insta-profile.jpg";
import Buttons from "../../Buttons/Buttons";

export default function ContentPost({postInfo}){

    const [images, setImages] = useState(null);
    const [replies, setReplies] = useState([])

    const replyInfo = {
        author: "very unhappy person",
        pfp: 9,
        content: "Fix your app",
        time: "14 hrs", likes: "4"
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
        setReplies([replyInfo])
    }, [])
    
    function loadedImages(num){
        return images ?
            <img className="media" src={images[num].download_url}/> :
            <div className="media-loading"></div>
    }
    
    const repliesJSX = replies.map(elem => reply(elem)); 

    // COMPONENT
    function personDetails(){
        return (
            <div className="person-detail-flex">
                <div className="person-detail-image">
                    <img src={postInfo.pfp} />
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
            <div className="reply">
                <div className="reply-profile-img">{loadedImages(11)}</div>
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
        return (
            <div className="post-interaction">
                <div className="interaction-stats">
                    <div><IconComponents.ThumbUpIcon/> {postInfo.likes} Likes</div>
                    <div>{postInfo.comments} Comments  ·  {postInfo.shares} Shares</div>
                </div>

                <div className="interaction-prompt">
                    <div><IconComponents.ThumbUpIcon/> Like</div>
                    <div><IconComponents.ChatBubbleIcon/> Comment </div>
                    <div><IconComponents.ArrowIcon/> Share </div>
                </div>

                {commentBox()}

                <div className="replies">
                    <div className="most-relevant">Most relevant  <IconComponents.ExpandDownIcon/></div>

                    {repliesJSX}
                </div>
            </div>
        )
    }

    // COMPONENT REFERENCED BY interaction
    function commentBox(){

        return (
            <div className="comment-box">
                <div className="reply-profile-img">{loadedImages(7)}</div>
                <form className="comment-form">
                    <textarea placeholder="Enter comment here..."/>
                    <Buttons.SubmitButton width="10em" center={true}/>
                </form>
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