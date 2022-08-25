import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index-style.css";
import Buttons from "./components/Buttons/Buttons";
import { useSelector } from "react-redux";
import { MediaContext } from "./Contexts/MediaContext";
import { FaBars } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import HeaderDropdown from "./components/Dropdowns/HeaderDropdown";
import { StockImages } from "./Contexts/StockImages";

export default function Header() {
  const [loggedInState, setLoggedInState] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const client = useSelector((state) =>
    state.clientInfo.value ? state.clientInfo.value.payload : null
  );
  const { isTablet } = useContext(MediaContext);
  const { images, loadedImages } = useContext(StockImages);

  useEffect(() => {
    setLoggedInState(client ? true : false);
  }, []);

  function handleLogInOut(e) {
    if (loggedInState) {
      // logout
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    } else {
      // login
      window.location.href = "/login";
    }
  }

  function navigateHome() {
    if (loggedInState) {
      let username = client.username;
      window.location.href = `/users/${username}/home`;
      return;
    } else {
      window.location.href = "/login";
    }
  }

  function openDropdown() {
    setDropdownOpen(true);
  }

  return (
    <div className="header-container">
      <AnimatePresence>
        {isTablet && dropdownOpen && (
          <HeaderDropdown setDropdownOpen={setDropdownOpen} />
        )}
      </AnimatePresence>

      <header className="Header">
        <div className="name">textApp</div>
        {isTablet ? (
          <div style={{ paddingTop: "0.5em" }}>
            <Buttons.DefaultButton
              handleClick={openDropdown}
              contentColor="#1b74e4"
              theme="white"
            >
              <FaBars size={20} />
            </Buttons.DefaultButton>
          </div>
        ) : (
          <nav>
            <ul>
              {client && (
                <li>
                  <div className="header-user-profile">
                    <div
                      style={{ width: "40px" }}
                      className="person-detail-image"
                    >
                      {!client.user_pfp ? (
                        loadedImages(client.stock_pfp)
                      ) : (
                        <img
                          className="media"
                          src={
                            client.oauth_login
                              ? client.user_pfp
                              : `/api/media/${client.user_pfp}`
                          }
                          referrerPolicy="no-referrer"
                          alt=""
                        />
                      )}
                    </div>

                    <div className="header-username">{client.username}</div>
                  </div>
                </li>
              )}
              <li style={{ display: "flex", alignItems: "center" }}>
                <Buttons.DefaultButton
                  theme="white"
                  handleClick={handleLogInOut}
                >
                  {" "}
                  {loggedInState ? "Logout" : "Login"}{" "}
                </Buttons.DefaultButton>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
