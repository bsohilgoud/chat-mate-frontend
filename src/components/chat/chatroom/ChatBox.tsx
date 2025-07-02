import React, { useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

import { FaSmile } from "react-icons/fa";
import { useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { FileUploader } from "../../common/FileUploader/FileUploader";
import { Divider } from "../../common/Divider";
import { useChatContext } from "../../../context/ChatContext";
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react";
import { useUIContext } from "../../../context/UIContext";
import { MediaUpload } from "../../common/MediaUpload";
import { useNotification } from "../../../hooks/useNotification";
import { TypingIndicator } from "../../common/TypingIndicator";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const {
    chatPartnerId,
    showChatPartnerIsTyping,
    setShowChatPartnerIsTyping,
    chatPartner,
  } = useChatContext();
  const { sendChatMessage } = useChat();
  const { theme } = useUIContext();
  const { sendUserTypingNotification } = useNotification();
  const chatInputRef = useRef(null);
  const iconSendRef = useRef(null);
  const empojiIconRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        showEmojis &&
        emojiPickerRef.current &&
        empojiIconRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !empojiIconRef.current.contains(event.target as Node)
      ) {
        setShowEmojis(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [showEmojis]);

  const handleSend = () => {
    if (message.trim()) {
      chatInputRef.current.value = "";
      sendChatMessage(message, chatPartnerId);
      setMessage("");
      setShowEmojis(false);
    }
  };

  const onChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value !== "") {
      sendUserTypingNotification();
      iconSendRef.current.style.color = "var(--accent-color)";
    } else {
      iconSendRef.current.style.color = "var(--highlight-color)";
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    const newMessage = message + emojiData.emoji;

    setMessage(newMessage);
    if (chatInputRef.current) {
      chatInputRef.current.value = newMessage;
    }
  };

  return (
    <div
      className="relative chat-box flex min-h-75px bg-[var(--secondary-color)] mb-8 mx-5 px-4 py-3 rounded-xl border-[0.5px] border-[var(--border-color)] flex focus-within:border-b-[1px] focus-within:border-b-[var(--accent-color)]"
      style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 5px" }}
    >
      {showChatPartnerIsTyping && (
        <div className="absolute -top-12 left-5 flex justify-center align-center">
          <span className="text-[var(--accent-color)] text-[1.5rem] font-semibold">
            {chatPartner?.fullName}
          </span>
          <TypingIndicator />
        </div>
      )}
      <input
        className="ml-3 px-2 outline-none flex-1"
        placeholder="Type your message..."
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        value={message}
        ref={chatInputRef}
      />
      {/* <textarea
        className="chat-input outline-none ml-5 px-4 pt-2 outline-none flex-1 min-h-[24px] max-h-[100px] sm:max-h-[120px] overflow-y-auto"
        placeholder="Type your message..."
        onChange={onChange}
        ref={chatInputRef}
      /> */}
      <div className="icons flex items-center justify-end ">
        <div ref={empojiIconRef}>
          <FaRegFaceSmile
            size={18}
            className="mx-2 text-[var(--text-muted)] hover:text-[var(--accent-color)]"
            onClick={() => setShowEmojis((val) => !val)}
          />
        </div>
        <MediaUpload>
          <FaRegImage
            size={18}
            className="mx-2 text-[var(--text-muted)] hover:text-[var(--accent-color)]"
          />
        </MediaUpload>
        <Divider type="vertical" />
        <div ref={iconSendRef}>
          <MdSend size={20} className="mx-3" onClick={handleSend} />
        </div>
        {/* <div className="text-4xl ">➤</div> */}
        <div className="absolute bottom-20 z-100" ref={emojiPickerRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            open={showEmojis}
            lazyLoadEmojis={true}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
