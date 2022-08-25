import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.css";

import IconComponents from "../../icon-components/icon-components";
import Buttons from "../Buttons/Buttons";

export default function Sidebar() {
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

  function navigateToClient() {
    if (client) {
      window.location = `/users/${client.username}/home`;
    } else {
      window.location = `/login`;
    }
  }

  return (
    <div className="sidebar-left" style={{ backgroundColor: "white" }}>
      <div className="sidebar-options">
        <div className="sidebar-options-basic">
          <Buttons.DefaultButton
            handleClick={() => (window.location = `/feed`)}
            {...selectButtonProps}
          >
            <IconComponents.HomeIcon /> Home
          </Buttons.DefaultButton>
          <Buttons.DefaultButton
            handleClick={() => navigateToClient()}
            {...selectButtonProps}
          >
            <IconComponents.UserIcon /> My Profile
          </Buttons.DefaultButton>
        </div>
        <div className="friends-flex">
          <div style={headerStyle}>Online Friends</div>
          <div> This feature has not been added yet. </div>
        </div>
        <div className="suggested-users">
          <div style={headerStyle}>Suggested Users</div>
          <div> This feature has not been added yet. </div>
        </div>
      </div>
    </div>
  );
}
