import React from "react";
import { formatMessageDateWithDay } from "../../../../services/helper";
import "./ChatUserCard.scss";
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
      <div className="name-date-container">
        <div className="name">{conversation.partnerDisplayName}</div>
        <div className="date"> {formattedTime}</div>
      </div>
      <div className="message-container">
        <div className="message">
          {conversation.senderId === currentUser ? "You: " : ""}
          {conversation.content.length > 40
            ? conversation.content.slice(0, 40) + "..."
            : conversation.content}
        </div>
        {conversation.newMessagesCount > 0 ? (
          <div className="unread-count">{conversation.newMessagesCount}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatUserCard;
