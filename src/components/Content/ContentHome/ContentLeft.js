import React, {useState, useEffect} from "react";
import ContentLeftVideos from "./ContentLeftVideos";
import IconComponents from "../../../icon-components/icon-components"

export default function ContentLeft(){
  
  const [images, setImages] = useState(null);

  const loadedImages = function(){
    return(
      images ? 
      (<>
        <img className="grid-image" src={images[0].download_url} alt="grid-1"/>
        <img className="grid-image" src={images[1].download_url} alt="grid-2"/>
        <img className="grid-image" src={images[2].download_url} alt="grid-3"/>
        <img className="grid-image" src={images[3].download_url} alt="grid-4"/>
      </>) : 
      (<>
        <div className="grid-image-loading"></div>
        <div className="grid-image-loading"></div>
        <div className="grid-image-loading"></div>
        <div className="grid-image-loading"></div>
      </>)

    )
  }

  function loadSingleImg(num){
    return images? 
      <img src={images[num].download_url} alt="single-1"/> : 
      <div className="related-image-loading"></div>
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
  
  return (
    <div className="content-home-left">
      <div className="about">
        <h3>About</h3>
        <div><IconComponents.InfoIcon/>Discover what's next on Instagram</div>
        <div><IconComponents.ThumbUpIcon/>60,932,562 people like this</div>
        <div><IconComponents.ThumbUpIcon/>64,622,910 people follow this</div>
        <div><IconComponents.GlobeIcon/>http://instagram.com/</div>
        <div><IconComponents.FolderIcon/>App Page · Home</div>

      </div>
      <div className="photos">
        <h3>Photos</h3>
        <div className="photos-grid">
          {loadedImages()}
        </div>
        <div className="photos-more"> See more </div>
      </div>
      <ContentLeftVideos images={images}/>
      <div className="related-pages">
        <h3>Related Pages</h3>
        <div className="related-card">
          <div className="related-card-image">{loadSingleImg(12)}</div>
          <div>
            <div>Google play <IconComponents.Checkmark/> </div>
            <div className="related-about">product/service</div>
          </div>
        </div>
        <div className="related-card">
          <div className="related-card-image">{loadSingleImg(13)}</div>
          <div>
            <div>Twitter <IconComponents.Checkmark/> </div>
            <div className="related-about">App page</div>
          </div>
        </div>
        <div className="related-card">
          <div className="related-card-image">{loadSingleImg(14)}</div>
          <div>
            <div>Harry styles <IconComponents.Checkmark/> </div>
            <div className="related-about">Musician</div>
          </div>
        </div>
      </div>

      <div className="small-talk" style={{minHeight: "auto"}}>
        Information about Page Insights data  · Privacy  · Terms  · Advertising  · Ad choices   · Cookies  ·  Meta © 2022
      </div>
    </div>
  )
  }