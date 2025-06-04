import React, { useRef } from "react";
import { MdSend } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

import { FaSmile } from "react-icons/fa";
import { useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { FileUploader } from "../../common/FileUploader/FileUploader";
import { Divider } from "../../common/Divider";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const chatInputRef = useRef(null);

  const handleSend = () => {
    // if (message.trim()) {
    //   sendChatMessage(message);
    //   setMessage("");
    //   chatInputRef.current.value = "";
    //   chatInputRef.current.style.height = "0px";
    //   setTimeout(() => {
    //     const messagesContainer = document.querySelector("#messages-container");
    //     if (messagesContainer) {
    //       console.log(
    //         "scroll top: " +
    //           messagesContainer.scrollTop +
    //           "scrollHeight: " +
    //           messagesContainer.scrollHeight,
    //       );
    //       messagesContainer.scrollTop = messagesContainer.scrollHeight;
    //     }
    //   }, 100);
    // }
  };

  const onChange = (e) => {
    // setMessage(e.target.value);
    // document.querySelector(".icon-send").style.color =
    //   e.target.value !== "" ? "var(--accent-color)" : "var(--highlight-color)";
    // e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="chat-box flex min-h-75px bg-[var(--secondary-color)] mb-8 mx-5 px-4 py-3 rounded-xl border-[0.5px] border-[var(--border-color)] flex focus-within:border-b-[.5px] focus-within:border-b-[var(--accent-color)]">
      <input
        className="ml-3 px-2 outline-none flex-1"
        placeholder="Type your message..."
      />
      {/* <textarea
        className="chat-input outline-none ml-5 px-4 pt-2 outline-none flex-1 min-h-[24px] max-h-[100px] sm:max-h-[120px] overflow-y-auto"
        placeholder="Type your message..."
        onChange={onChange}
        ref={chatInputRef}
      /> */}
      <div className="icons flex items-center justify-end ">
        <FaRegFaceSmile
          size={18}
          className="mx-2 text-[var(--text-muted)] hover:text-[var(--accent-color)]"
        />
        <FaRegImage
          size={18}
          className="mx-2 text-[var(--text-muted)] hover:text-[var(--accent-color)]"
        />
        <Divider type="vertical" />
        <MdSend size={20} className="mx-3" onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;
