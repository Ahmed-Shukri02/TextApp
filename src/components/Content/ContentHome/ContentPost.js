import React, {useState, useEffect} from "react";
import IconComponents from "../../../icon-components/icon-components"
import profile from "../../../images/insta-profile.jpg";

export default function ContentPost(){

    const [images, setImages] = useState(null);

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
    
    const loadedImages = (num) => (
        images ?
            <img className="media" src={images[num].download_url}/> :
            <div className="media-loading"></div>
    )

    // COMPONENT
    function personDetails(){
        return (
            <div className="person-detail-flex">
                <div className="person-detail-image">
                    <img src={profile} />
                </div>
                <div className="person-detail-info">
                    <div className="post-author">Instagram <IconComponents.Checkmark/> </div>
                    <div className="post-time">21 hrs</div>
                </div>
            </div>
        )
    }

    // COMPONENT
    function post(){
        return (
            <div className="post">
                <div className="post-content">Back at it with Tips n Tricks — this time about how to up your Feed game</div>

                {loadedImages(10)}
            </div>
        )
    }

    // COMPONENT REFERENCED BY interaction
    function reply(){
        return (
            <div className="reply">
                <div className="reply-profile-img">{loadedImages(11)}</div>
                <div>
                    <div className="reply-profile-content">
                        <div className="reply-profile-name">Very Unhappy Person</div>
                        <div className="reply-profile-reply">Fix your app</div>
                    </div>

                    <div className="reply-stats">
                        <div className="reply-time">19h</div>
                        <div className="reply-likes"><IconComponents.ThumbUpIcon/> 4</div>
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
                    <div><IconComponents.ThumbUpIcon/> 922</div>
                    <div>355 comments  27 shares</div>
                </div>

                <div className="interaction-prompt">
                    <div><IconComponents.ThumbUpIcon/> Like</div>
                    <div><IconComponents.ChatBubbleIcon/> Comment </div>
                    <div><IconComponents.ArrowIcon/> Share </div>
                </div>

                <div className="replies">
                    <div className="most-relevant">Most relevant  <IconComponents.ExpandDownIcon/></div>

                    {reply()}
                </div>
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