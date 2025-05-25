import React from "react";
import "./ChatMessage.scss";
import { MdDoneAll } from "react-icons/md";
import { MdSchedule } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

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
  if (message.type != "TEXT")
    console.log("message: " + JSON.stringify(message));

  return (
    <div className={chatMessageClassName}>
      <div className="message-content">
        {message.type == null &&
          message.content != null &&
          (message.type = "TEXT")}
        {message.type == "TEXT" ? (
          message.content
        ) : (
          <MediaMessageContent mediaMeta={message.mediaFileDTO} />
        )}
      </div>
      <div className="message-time">{formattedTime}</div>
      {isMyMessage && (
        <div className="message-status">
          {message.status == "PENDING" ? (
            <MdSchedule color="grey" size={16} />
          ) : message.status == "DELIVERED" ? (
            <MdDoneAll color="grey" size={16} />
          ) : message.status == "READ" ? (
            <MdDoneAll color="deepskyblue" size={16} />
          ) : (
            <IoMdAlert color="red" size={16} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
