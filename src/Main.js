import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index-style.css";
import "./components/Content/Content.css";
import User from "./components/User";
import Login from "./components/LoginPage/Login";
import { MediaContext } from "./Contexts/MediaContext";
import { useMediaQuery } from "react-responsive";
import Home from "./components/HomePage/Home";
import Welcome from "./components/WelcomePage/Welcome";
import Feed from "./components/FeedPage/Feed";
import { StockImages } from "./Contexts/StockImages";


export default function Main(){
  
  const isMobile = useMediaQuery({query: "(max-width: 650px)"})
  const isTablet = useMediaQuery({query: "(max-width: 1000px)"})

  const [images, setImages] = useState(null)

  useEffect(() => {
    async function getData(){
      // get stock images
      let picResponse = await fetch('https://picsum.photos/v2/list')
      let picResponseJSON = await picResponse.json();

      setImages(picResponseJSON)
    }

    getData()
  }, [])

  function loadedImages(num){
    return images ?
      <img className="media" src={images[num].download_url} alt="single-2"/> :
      <div className="media-loading"></div>
  }
  
  return (
    images &&
    <StockImages.Provider value={{images, loadedImages}}>
      <MediaContext.Provider value={{isMobile, isTablet}}>
        <Routes>
          <Route path="users/:id/*" element={<User/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="/feed" element={<Feed/>}/>
        </Routes>
      </MediaContext.Provider>
    </StockImages.Provider>
  )
}