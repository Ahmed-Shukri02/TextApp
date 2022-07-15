import React, {useState} from "react";
import { Link } from "react-router-dom";
import DropDown from "./Dropdown";
import IconComponents from "../icon-components/icon-components";

export default function ProfileNav(){

    function handleClick(e){        
        // find div with current class
        let prevNav = document.querySelector(".currentNav");
        prevNav && prevNav.classList.remove("currentNav");

        // add current class to clicked element
        let newNav = e.target.parentElement;

        newNav.classList.add("currentNav");
    }
    
    const more_dropdown = (
    <div className="dropdown">
        <div>About</div>
        <div>Community</div>
        <div>Events</div>
    </div>
    )
    
    const more_content = {content: <>More <IconComponents.ExpandDownIcon/></>, dropDown: more_dropdown}


    const icon_dropdown = (
        <div className="dropdown icon-dropdown">
            <div><IconComponents.ArrowIcon/> Share </div>
            <div><IconComponents.CircleCrossIcon/> Block</div>
        </div>
    )

    const icon_content = {content: <IconComponents.DotsIcon/>, dropDown: icon_dropdown}

    return (
        <div className="profile-nav">
            <div className="profile-nav-selections">
                <div>
                    <Link to='/home' onClick={ (e) => handleClick(e)}> </Link>
                    <div className="selection-content">Home</div> 
                </div>

                <div>
                    <Link to='/reviews' onClick={(e) => handleClick(e)}></Link>
                    <div className="selection-content">Reviews</div>
                </div>

                <div>
                    <Link to='/videos' onClick={(e) => handleClick(e)}> </Link>
                    <div className="selection-content">Videos</div>
                </div>

                <div>
                    <Link to='/photos' onClick={(e) => handleClick(e)}> </Link>

                    <div className="selection-content">Photos</div> 
                </div>

                <DropDown className="dropdown-selection" info={more_content}/>
            </div>

            <div className="profile-nav-right">
                <DropDown className="dropdown-selection" info={icon_content}/>
            </div>
        </div>
    )
}