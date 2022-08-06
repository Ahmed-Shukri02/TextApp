import React from "react";

export default function ContentLeftVideos({images}){
  return (
    <div className="videos">
      <div className="videos-header">
        <h3>Videos</h3>
        <div>See all</div>
      </div>
      <div className="videos-content">
        {
        images
        ? <img className="video-card" src={images[5].download_url} alt="video-1"/>
        : <div className="grid-image-loading"> </div>
        }

        <div className="video-card-desc">Artist Stromae thinks the real star of his concerts is his robotic dog and hes not wrong </div>
      </div>
      <div className="videos-interaction">
        <div className="videos-reactions">
          <span>Reactions</span>
          <span>97</span>
        </div>

        <div className="video-stats"> 3.2K views  · 45 minutes ago</div>
      </div>
    </div>
  )
}