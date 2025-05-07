import React from "react";
import "./ChatMessage.scss";
import { MdDoneAll } from "react-icons/md";
import type { ChatMessageType } from "../../../../context/ChatContext";
import { MediaMessageContent } from "../../../common/MediaMessageContent/MediaMessageContent";

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

  if (message.content == null)
    console.log("message: " + JSON.stringify(message));

  return (
    <div className={chatMessageClassName}>
      <div className="message-content">
        {message.type == "TEXT" ? (
          message.content
        ) : (
          <MediaMessageContent mediaMeta={message.mediaFileDTO} />
        )}
      </div>
      <div className="message-time">{formattedTime}</div>
      {isMyMessage && (
        <div className="message-status">
          <MdDoneAll color="deepskyblue" size={16} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
