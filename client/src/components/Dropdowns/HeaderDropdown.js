import React from "react";
import { motion } from "framer-motion";
import IconComponents from "../../icon-components/icon-components";
import Buttons from "../Buttons/Buttons";
import Sidebar from "../Sidebars/Sidebar";
import { useSelector } from "react-redux";

export default function HeaderDropdown({ setDropdownOpen }) {
  let selectButtonProps = {
    theme: "white",
    width: "20em",
    height: "3em",
    addStyle: "no-center icon-button",
  };

  const headerStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
  };

  const client = useSelector((state) =>
    state.clientInfo.value ? state.clientInfo.value.payload : null
  );

  function handleLogInOut(e) {
    if (client) {
      // logout
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    } else {
      // login
      window.location.href = "/login";
    }
  }

  return (
    <motion.div
      className="drop-down"
      initial={{ opacity: 0, top: "-100%" }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: "-100%" }}
      transition={{ type: "tween" }}
    >
      <div className="drop-down-header">
        <div onClick={() => setDropdownOpen(false)} className="cross-icon-div">
          <IconComponents.CloseIcon
            color="lightslategray"
            iconClass="cross-icon"
          />
        </div>
      </div>

      <div className="drop-down-sidebar">
        <div
          className="sidebar-left"
          style={{ backgroundColor: "white", boxShadow: "none" }}
        >
          <div className="sidebar-options">
            <div className="sidebar-options-basic">
              <Buttons.DefaultButton
                handleClick={() => handleLogInOut()}
                {...selectButtonProps}
              >
                {client ? "Logout" : "Login"}
              </Buttons.DefaultButton>

              <Buttons.DefaultButton
                handleClick={() => (window.location = `/feed`)}
                {...selectButtonProps}
              >
                <IconComponents.HomeIcon /> Home
              </Buttons.DefaultButton>
              <Buttons.DefaultButton
                handleClick={() =>
                  (window.location = `/users/${client.username}/home`)
                }
                {...selectButtonProps}
              >
                <IconComponents.UserIcon /> My Profile
              </Buttons.DefaultButton>
            </div>
            <div className="friends-flex">
              <div style={headerStyle}>Online Friends</div>
              <div> This feature has not been added yet. </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
