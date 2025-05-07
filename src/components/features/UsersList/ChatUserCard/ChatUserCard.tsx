import React from "react";
import { formatMessageDateWithDay } from "../../../../services/helper";
import "./ChatUserCard.scss";
import { FaRegImage } from "react-icons/fa6";

import ProfileIcon from "../../../common/ProfileIcon/ProfileIcon";
const ChatUserCard = ({ conversation, handleSetChatPartner }) => {
  const currentUser = sessionStorage.getItem("userId");

  const showUserChat = (event: React.MouseEvent<HTMLDivElement>) => {
    const previousActivePartner = document.querySelector(
      ".chat-user-card.active",
    );
    if (previousActivePartner) {
      previousActivePartner.classList.remove("active");
    }
    event.currentTarget.classList.add("active");
    handleSetChatPartner();
  };

  const formattedTime = formatMessageDateWithDay(conversation.timestamp, true);

  return (
    <div className="chat-user-card" onClick={showUserChat}>
      {/* <div className="profile-icon-container"> */}
      <ProfileIcon
        photoURL={conversation.photoURL}
        displayName={conversation.partnerDisplayName}
        fontSize={18}
        imageSize={36}
      />
      {/* </div> */}
      <div className="conversation-container">
        <div className="name-date-container">
          <div className="name">{conversation.partnerDisplayName}</div>
          <div className="date"> {formattedTime}</div>
        </div>
        <div className="message-container">
          <div className="message">
            {conversation.senderId === currentUser ? "You: " : ""}
            {conversation.contentType === "TEXT" &&
              (conversation.content.length > 40
                ? conversation.content.slice(0, 40) + "..."
                : conversation.content)}
            {conversation.contentType === "IMAGE" && (
              <FaRegImage style={{ marginLeft: "5px" }} size={16} />
            )}
          </div>
          {conversation.newMessagesCount > 0 ? (
            <div className="unread-count">{conversation.newMessagesCount}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
