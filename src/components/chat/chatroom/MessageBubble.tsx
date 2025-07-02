import React, { useEffect, useState } from "react";
import { MdDoneAll } from "react-icons/md";
import { MdSchedule } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { chatMessage } from "../../../types/chatTypes";
import { useAuthContext } from "../../../context/AuthContext";
import { useMediaStore } from "../../../hooks/useMediaStore";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { formatBytes } from "../../../services/helper";

const MessageBubble = ({ message }: { message: chatMessage }) => {
  const { user } = useAuthContext();
  const { loadMediaBlob } = useMediaStore();

  const isOwnMessage = message.senderId == user?.id;
  const date = new Date(message.timestamp + "Z");
  const formattedTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isOnlyEmojis = (content: string) => {
    if (content == null) return;
    try {
      const trimmed = content.replace(/\s/g, "");
      const isOnlyEmojis =
        trimmed &&
        /^[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]+$/u.test(
          trimmed,
        );
      const emojiCount = isOnlyEmojis ? Array.from(trimmed).length : 0;
      return emojiCount == 1;
    } catch (error) {
      console.error(error);
      console.warn("Error for message: " + JSON.stringify(message));
    }
  };

  const renderMedia = (mediaDTO) => {
    const mediaClasses = "rounded-lg max-w-full";
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);

    if (!mediaDTO) return null;

    const mediaType = mediaDTO.type;
    const firstUnderscoreIndex = mediaDTO.name.indexOf("_");
    const fileName = mediaDTO.name.slice(firstUnderscoreIndex + 1);
    const fileSize = formatBytes(mediaDTO.size);

    useEffect(() => {
      if (message.mediaFileDTO != null) {
        const loadMedia = async () => {
          const mediaFileName = mediaDTO.name;
          const objectURL = await loadMediaBlob(mediaFileName);
          setMediaUrl(objectURL);
        };

        if (mediaType == "IMAGE") loadMedia();
      }
    }, []);

    switch (mediaType) {
      case "IMAGE":
        return (
          <div className="">
            <img
              src={mediaUrl}
              className={`${mediaClasses} max-h-80 w-auto object-cover cursor-pointer hover:opacity-95 transition-opacity`}
              loading="lazy"
            />
          </div>
        );
      case "FILE":
        return (
          <div
            className={`flex items-center space-x-3 bg-opacity-10 rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-all duration-200 ease-in-out  backdrop-blur-[10px] shadow-sm
              ${isOwnMessage ? "bg-[rgba(255,255,255,0.15)]" : "bg-[var(--border-color)]"}`}
          >
            <div className="flex-shrink-0">
              <FiFileText size={24} />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <span className="text-[1.25rem] font-medium wrap-anywhere">
                {fileName}
              </span>
              <span className="text-[1rem]"> {fileSize}</span>
            </div>
            <MdOutlineFileDownload size={24} className="ml-4 flex-shrink-0" />
          </div>
        );
      default:
        return null;
    }
  };
  const renderReply = () => {};

  return (
    <div
      className={`flex mb-2 px-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl `}
      >
        {/* background: linear-gradient(135deg, #6a40ff 0%, #9d7bff 100%); */}
        <div
          className={` relative px-3 py-2 rounded-2xl shadow-sm ${isOwnMessage ? "bg-gradient-to-br from-[#6a40ff] to-[#9d7bff]  text-white rounded-br-md" : "bg-[var(--tertiary-color)] rounded-bl-md"}`}
        >
          {/* {message.replyToMessageId && renderReply()} */}
          {message.mediaFileDTO && renderMedia(message.mediaFileDTO)}

          {message && (
            <div
              className={`break-words hyphens-auto ${isOnlyEmojis(message.content) ? "leading-none text-7xl" : "leading-relaxed text-[1.5rem]"} `}
            >
              <span className="inline">{message.content}</span>
              <span className="inline-block w-22 h-0"></span>
            </div>
          )}

          <div className="absolute bottom-1 right-3 text-[1rem] leading-none p-1">
            {formattedTime.toUpperCase()}
          </div>
          {isOwnMessage && (
            <div className="message-status absolute right-[-20px] bottom-0">
              {message.status == "PENDING" ? (
                <MdSchedule color="grey" size={16} />
              ) : message.status == "DELIVERED" ? (
                <MdDoneAll color="grey" size={16} />
              ) : message.status == "READ" ? (
                <MdDoneAll className="text-green-500" size={16} />
              ) : (
                <IoMdAlert color="red" size={16} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
