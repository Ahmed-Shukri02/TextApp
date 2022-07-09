import React, {useState} from "react";
import DropDown from "./Dropdown";
import ArrowIcon from "../icon-components/arrow-redo-outline";
import DotsIcon from "../icon-components/ellipsis-horizontal-outline";
import CircleCrossIcon from "../icon-components/close-circle-outline";
import ExpandDownIcon from "../icon-components/chevron-down-outline";

export default function ProfileNav(){

    const more_dropdown = (
    <div className="dropdown">
        <div>About</div>
        <div>Community</div>
        <div>Events</div>
    </div>
    )
    
    const more_content = {content: <>More <ExpandDownIcon/></>, dropDown: more_dropdown}


    const icon_dropdown = (
        <div className="dropdown icon-dropdown">
            <div><ArrowIcon/> Share </div>
            <div><CircleCrossIcon/> Block</div>
        </div>
    )

    const icon_content = {content: <DotsIcon/>, dropDown: icon_dropdown}

    return (
        <div className="profile-nav">
            <div className="profile-nav-selections">
                <div>Home</div>
                <div>Reviews</div>
                <div>Videos</div>
                <div>Photos</div>
                <DropDown className="dropdown-selection" info={more_content}/>
            </div>

            <div className="profile-nav-right">
                <DropDown className="dropdown-selection" info={icon_content}/>
            </div>
        </div>
    )
}