import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import ProfileCard from "./components/ProfileCard";
import ContentHome from "./components/Content/ContentHome/ContentHome";
import ContentReview from "./components/Content/ContentReview/ContentReview";


export default function Main(){
    // query for all number type inputs and disable scrolling function
    


    return (
        <Router>
            <div className="main-container">
                <ProfileCard/>
                <div className="content-container">
                        <Switch>
                            <Route path={"/home"}> <ContentHome/> </Route>
                            <Route path={"/reviews"}> <ContentReview/> </Route>
                        </Switch>
                    </div>
            
            </div>
        </Router>
    )
}