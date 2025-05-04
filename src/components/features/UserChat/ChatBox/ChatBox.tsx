import React, { useRef } from "react";
import { useChatOperations } from "../../../../hooks/useChat";
import "./ChatBox.css";
import { MdSend } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

import { FaSmile } from "react-icons/fa";
import { useState } from "react";

const ChatBox = () => {
  const { sendChatMessage } = useChatOperations();
  const [message, setMessage] = useState("");
  const chatInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      sendChatMessage(message);
      setMessage("");
      chatInputRef.current.value = "";
      chatInputRef.current.style.height = "0px";
      setTimeout(() => {
        const messagesContainer = document.querySelector("#messages-container");
        if (messagesContainer) {
          console.log(
            "scroll top: " +
              messagesContainer.scrollTop +
              "scrollHeight: " +
              messagesContainer.scrollHeight,
          );
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  };

  const onChange = (e) => {
    setMessage(e.target.value);
    document.querySelector(".icon-send").style.color =
      e.target.value !== "" ? "var(--accent-color)" : "var(--highlight-color)";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="chat-box">
      <div className="icon">
        <FaRegFaceSmile />
      </div>
      <div className="icon">
        <FaRegImage />
      </div>
      <textarea
        className="chat-input"
        placeholder="Type your message..."
        value={message}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        ref={chatInputRef}
      />
      <div className="icon icon-send">
        <MdSend onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;
