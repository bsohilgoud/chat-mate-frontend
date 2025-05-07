import React from "react";
import ProfileIcon from "../../../common/ProfileIcon/ProfileIcon";
import "./ChatHeader.scss";
import { ChatPartner } from "../../../../context/ChatContext";
const ChatHeader = ({ chatPartner }: ChatPartner) => {
  const shortName = chatPartner.displayName
    .split(" ")
    .map((word: string) => word[0] || "")
    .join("");

  return (
    <div className="header">
      <ProfileIcon
        photoURL={chatPartner.photoURL}
        displayName={chatPartner.displayName}
        fontSize={24}
        imageSize={42}
      />
      <div className="chat-user-name">{chatPartner.displayName}</div>
    </div>
  );
};

export default ChatHeader;
