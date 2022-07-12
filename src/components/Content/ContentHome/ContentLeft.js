import React from "react";
import FolderIcon from "../../../icon-components/folder-outline";
import GlobeIcon from "../../../icon-components/globe-outline";
import InfoIcon from "../../../icon-components/information-circle-outline";
import ThumbUpIcon from "../../../icon-components/thumbs-up-outline";

export default function ContentLeft(){
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
            <div className="photos"></div>
            <div className="videos"></div>
            <div className="page-transparency"></div>
        </div>
    )
}