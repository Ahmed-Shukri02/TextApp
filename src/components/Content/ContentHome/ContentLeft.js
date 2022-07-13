import React, {useState, useEffect} from "react";
import FolderIcon from "../../../icon-components/folder-outline";
import GlobeIcon from "../../../icon-components/globe-outline";
import InfoIcon from "../../../icon-components/information-circle-outline";
import ThumbUpIcon from "../../../icon-components/thumbs-up-outline";

export default function ContentLeft(){
    
    const [images, setImages] = useState(null);

    const loadedImages = function(){
        return(
            images ? 
            (<>
                <img className="grid-image" src={images[0].download_url}/>
                <img className="grid-image" src={images[1].download_url}/>
                <img className="grid-image" src={images[2].download_url}/>
                <img className="grid-image" src={images[3].download_url}/>
            </>) : 
            (<>
                <div className="grid-image-loading"></div>
                <div className="grid-image-loading"></div>
                <div className="grid-image-loading"></div>
                <div className="grid-image-loading"></div>
            </>)

        )
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
                <div><InfoIcon/>Discover what's next on Instagram</div>
                <div><ThumbUpIcon/>60,932,562 people like this</div>
                <div><div></div>64,622,910 people follow this</div>
                <div><GlobeIcon/>http://instagram.com/</div>
                <div><FolderIcon/>App Page · Home</div>

            </div>
            <div className="photos">
                <h3>Photos</h3>
                <div className="photos-grid">
                    {loadedImages()}
                </div>
                <div style={{textAlign: "center", cursor: "pointer"}}> See more </div>
            </div>
            <div className="videos">
                <h3>Videos</h3>
            </div>
            <div className="related-pages">
                <h3>Related Pages</h3>
            </div>
        </div>
    )
}