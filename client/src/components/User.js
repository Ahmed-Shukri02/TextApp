import React, { useContext } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ContentHome from "./Content/ContentHome/ContentHome";
import ContentReview from "./Content/ContentReview/ContentReview";
import IconComponents from "../icon-components/icon-components";
import { StockImages } from "../Contexts/StockImages";
import Header from "../Header";
import Footer from "../Footer";
import LoadingScreen from "./LoadingPage/LoadingPage";
import { AnimatePresence } from "framer-motion";
import { MediaContext } from "../Contexts/MediaContext";
import Sidebar from "./Sidebars/Sidebar";
import serverLocation from "../Tools/serverLocation";

export default function User() {
  const [userInfo, setUserInfo] = useState(null);
  const [doesExist, setExistStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isTablet } = useContext(MediaContext);

  let { id } = useParams();

  // PLACEHOLDER TOKEN - NO LOGIN AUTH SET SO USE THIS TOKEN - UPDATE TOKEN AFTER EVERY LOGIN

  ///////////////////////////////////////////////////////////////////////////////////////

  let token = localStorage.getItem("userToken");

  ///////////////////////////////////////////////////////////////////////////////////////

  // fetch current user based on url
  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch(` ${serverLocation}/api/users/${id}`, { method: "GET" });

        if (response.status === 400) {
          let errMessage = await response.text();
          console.log(errMessage);

          setTimeout(() => {
            setUserInfo({});
            setExistStatus(false);
          }, 5000);

          return;
        }

        let profileInfo = await response.json();
        console.log(profileInfo);

        setUserInfo(profileInfo);
        setExistStatus(true);

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.log(`Err in fetching data: ${err.message}`);
      }
    }

    document.title = id;
    getData();
  }, []);

  function userPage() {
    if (!isTablet)
      return (
        <div className="main-container">
          <div style={{ display: "flex", width: "100%" }}>
            <Sidebar />
            <div className="content-container">
              <Routes>
                <Route
                  path="home"
                  element={<ContentHome userInfo={userInfo} token={token} />}
                />
                <Route
                  path="review"
                  element={<ContentReview userInfo={userInfo} token={token} />}
                />
              </Routes>
            </div>
            <ProfileCard userInfo={userInfo} />
          </div>
        </div>
      );
    else
      return (
        <div className="main-container">
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <ProfileCard userInfo={userInfo} />
            <div className="content-container content-container-full">
              <Routes>
                <Route
                  path="home"
                  element={<ContentHome userInfo={userInfo} token={token} />}
                />
                <Route
                  path="review"
                  element={<ContentReview userInfo={userInfo} token={token} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="Users">
      <Header />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {userInfo && userPage()}
      <Footer />
    </div>
  );
}
