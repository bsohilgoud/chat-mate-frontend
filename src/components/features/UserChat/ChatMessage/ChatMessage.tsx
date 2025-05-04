import React from "react";
import "./ChatMessage.scss";
import { MdDoneAll } from "react-icons/md";
import type { ChatMessageType } from "../../../../context/ChatContext";

type ChatMessageProps = {
  message: ChatMessageType;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isMyMessage = message.senderId == sessionStorage.getItem("userId");
  const chatMessageClassName = isMyMessage
    ? "chat-message my-message"
    : "chat-message";

  const date = new Date(message.timestamp + "Z");
  const formattedTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={chatMessageClassName}>
      <div className="message-content">{message.content}</div>
      <div className="message-time">{formattedTime}</div>
      {isMyMessage && (
        <div className="message-status">
          <MdDoneAll color="deepskyblue" size={10} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
