import React, {useState, useEffect} from "react";

import IconComponents from "../../../icon-components/icon-components"
import ContentComment from "./ContentComment"
import Reply from "./ContentReply";
import Buttons from "../../Buttons/Buttons";
import Inputs from "../../Inputs/Inputs";

export default function ContentPost({postInfo, AddReply, AddReplyTo, AddReplyLike, handleCloseComments, toggleSubCommentBox}){

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
    replyInfo = {...replyInfo, key: 0, parentKey: 0}
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

  function postCloseSubCommentBox(){
    handleCloseComments(postInfo.key)
  }

  function toggleSubComment(replyInfo, open){
    if(!replyInfo.commentBox) {postCloseSubCommentBox()}
    toggleSubCommentBox(replyInfo, postInfo.key, open)
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
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }

  /*
  =============================================================
    COMPONENTS
  =============================================================
  */
  
  const repliesJSX = postInfo.replies.map(elem => <Reply info={elem} key={elem.key} loadedImages = {loadedImages} handleLike = {handleReplyLike} handleReplyTo = {handleReplyTo} toggleSubComment = {toggleSubComment}/>);

  // COMPONENT
  function personDetails(){
    return (
      <div className="person-detail-flex">
        <div className="person-detail-image">
          {postInfo.isUsingStock? loadedImages(postInfo.pfpNum) : <img src={postInfo.pfp} alt=""/>}
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
      commentBox: false,
      toInfo: null,
      type: "comment",
      referenceType: null,

      repliesTo : [

      ]
    }
    
    function handleComment(e){
      // if previous state was false (i.e setting to true), then call a function from the parent
      if(!isCommenting) postCloseSubCommentBox()
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
      if(!input.value) return;

      seeMore(parseInt(input.value))
      
      input.value = ""
    }

    return (
      
      <div className="post-interaction">
        <div className="interaction-stats">
          <div><IconComponents.ThumbUpIcon fill="none"/> {postInfo.likes} Likes</div>
          <div>{postInfo.comments} {postInfo.comments === 1 ? "Comment" : "Comments"}  ·  {postInfo.shares} Shares</div>
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
                {commentsLength < postInfo.replies.length && <Buttons.DefaultButton width="7em" handleClick={() => seeMore(2)} fontSize="0.8rem" contentColor="white"> See more </Buttons.DefaultButton>}
                {commentsLength > 1 && <Buttons.DefaultButton width="7em"  handleClick={() => setCommentsLength(1)} fontSize="0.8rem" contentColor="white"> Collapse </Buttons.DefaultButton>}
              </div>
              <div className="see-n-more">
                {commentsLength < postInfo.replies.length && (
                  <div style={{display: "flex", flexDirection: "row", gap: "0.5em", alignItems: "center"}}>
                    <span>See # more: </span>
                    <form onSubmit={seeNmore}>
                      <Inputs.Number />
                      <Buttons.DefaultButton width="3em" height="2em" fontSize="0.8rem" contentColor="white"> # </Buttons.DefaultButton>
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