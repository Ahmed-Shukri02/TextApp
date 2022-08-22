import React, {useState, useEffect, useContext, useRef} from "react";
import IconComponents from "../../../icon-components/icon-components"
import Buttons from "../../Buttons/Buttons";
import Inputs from "../../Inputs/Inputs";
import { StockImages } from "../../../Contexts/StockImages";
import "../Content.css"
import { useSelector } from "react-redux";

export default function ContentPostMock({userInfo, media, postInfo = {}}){

  const {images} = useContext(StockImages)
  const [mockMedia, setMockMedia] = useState([])
  const mockText = postInfo?.post_text || "Lorem ipsum dolor sit amet..."

  function loadedImages(num){
    return images ?
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }
  
  
  useEffect(() => {
    if (!media?.length) return;
    
    setMockMedia([])
    const reader = new FileReader()
    reader.onloadend = () => {
      setMockMedia(oldVal => [...oldVal, reader.result])
    }
    console.log(media[0])
    reader.readAsDataURL(media[0])
    
  }, [media])
  
  const mediaJSX = mockMedia.map((elem, index) => 
    <img className="media" src={elem} alt={"single 5"}/>
  )

  // COMPONENT
  function personDetails(){
    return (
      <div data-testid="person-detail-flex" className="person-detail-flex">
        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
          <div className="person-detail-image">
            {!userInfo.user_pfp? loadedImages(userInfo.stock_pfp) : <img className="media" src={userInfo.oauth_login ? userInfo.user_pfp : `/api/media/${userInfo.user_pfp}`} referrerPolicy="no-referrer" alt=""/>}
          </div>
          <div className="person-detail-info">
            <Buttons.UnderlineButton addStyle="no-padding">
              <div className="post-author">{userInfo.username} {userInfo.is_verified && <IconComponents.Checkmark/>} </div>
            </Buttons.UnderlineButton>
            <div className="post-time">just now</div>
          </div>
        </div>
      </div>
    )
  }

  // COMPONENT
  function post(){
    return (
      <div className="post">
        <div className="post-content">{mockText}</div>
        {mediaJSX && mediaJSX}
      </div>
    )
  }

  // COMPONENT

  function Interaction(){
    const buttonStyle= {
      theme:"white",
      fontSize:"0.9rem",
      contentColor:"lightslategray",
      minWidth:"3em"
    }

    return (
      <div className="post-interaction">
        <div className="interaction-prompt">
          <div className="interaction-prompt-left">
            <Buttons.DefaultButton {...buttonStyle}><IconComponents.ThumbUpIcon/> 0 </Buttons.DefaultButton>

            <Buttons.DefaultButton testid="chat-button" {...buttonStyle}><IconComponents.ChatBubbleIcon/> 0 </Buttons.DefaultButton>

            <Buttons.DefaultButton {...buttonStyle}><IconComponents.ArrowIcon/> 0 </Buttons.DefaultButton>
          </div>
        </div>
      </div>
    )
  }

  //console.log(replies)

  return (
    <div className="content-post">
      {personDetails()}
      {post()}
      {Interaction()}
    </div>
  )
}