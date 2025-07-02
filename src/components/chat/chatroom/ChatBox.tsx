import React, { useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

import { useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { useChatContext } from "../../../context/ChatContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useUIContext } from "../../../context/UIContext";
import { MediaUpload } from "../../common/MediaUpload";
import { useNotification } from "../../../hooks/useNotification";
import { TypingIndicator } from "../../common/TypingIndicator";
import { useParams } from "react-router-dom";
import { RiSendPlaneFill, RiSendPlaneLine } from "react-icons/ri";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { showChatPartnerIsTyping, chatPartner } = useChatContext();
  const { sendChatMessage } = useChat();
  const { theme, selectedMenu, setSelectedMenu } = useUIContext();
  const { sendUserTypingNotification } = useNotification();
  const chatInputRef = useRef(null);
  const iconSendRef = useRef(null);
  const empojiIconRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const { partnerId } = useParams<{ partnerId?: string }>();

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
      sendChatMessage(message, partnerId);
      setMessage("");
      setShowEmojis(false);
      if (selectedMenu !== "chats")
        setTimeout(() => setSelectedMenu("chats"), 1000);
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
    <div className="flex w-full justify-center items-center gap-3 mb-6 px-12 pt-3">
      <div
        className="relative flex min-h-70px bg-[var(--secondary-color)] p-3 rounded-full flex-1
      border-[0.5px] border-[var(--border-color)] focus-within:border-[1.5px] focus-within:border-[var(--accent-color)] shadow-md"
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
        </div>
      </div>
      <div
        className="flex justify-center items-center h-[40px] w-[40px] text-white bg-[var(--accent-color)] rounded-full shadow-md cursor-pointer hover:bg-[#6b47ff]"
        ref={iconSendRef}
      >
        <RiSendPlaneFill
          ref={iconSendRef}
          size={24}
          className="mx-3"
          onClick={handleSend}
        />
      </div>
      <div className="absolute bottom-30 z-100 right-0" ref={emojiPickerRef}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          open={showEmojis}
          lazyLoadEmojis={true}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChatBox;
