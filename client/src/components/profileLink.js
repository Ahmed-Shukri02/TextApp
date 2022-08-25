import React from "react";
import IconComponents from "../icon-components/icon-components";
import Buttons from "./Buttons/Buttons";

export default function profileLink({ fromFeed, feedHandleClickOff }) {
  return (
    <div className="profile-link">
      <Buttons.DefaultButton
        width="100%"
        height="2em"
        contentColor="white"
        fontSize="0.9rem"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            justifyContent: "center",
          }}
        >
          <IconComponents.BellIcon />
          <span> Follow </span>
        </div>
      </Buttons.DefaultButton>
      {fromFeed && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Buttons.UnderlineButton
            handleClick={feedHandleClickOff}
            contentColor="red"
            fontSize="0.8rem"
          >
            Close Tab
          </Buttons.UnderlineButton>
        </div>
      )}
    </div>
  );
}
