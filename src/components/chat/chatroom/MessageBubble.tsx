import React from "react";
import { MdDoneAll } from "react-icons/md";
import { MdSchedule } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { MediaMessageContent } from "../../common/MediaMessageContent/MediaMessageContent";
import { chatMessage } from "../../../types/chatTypes";
import clsx from "clsx";

const MessageBubble = ({ message }: { message: chatMessage }) => {
  const isOwnMessage = message.senderId == sessionStorage.getItem("userId");
  const date = new Date(message.timestamp + "Z");
  const formattedTime = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  //   return (
  //     <div
  //       className={clsx(
  //         "message-bubble relative flex rounded-xl  px-4 py-2 text-[1.5rem] relative w-fit mt-2",
  //         isMyMessage
  //           ? "bg-[var(--message-bubble-sent)] self-end"
  //           : "bg-[var(--message-bubble-received)] self-start",
  //       )}
  //     >
  //       <div className="message-content break-words hyphens-auto leading-relaxed">
  //         <div className="inline">
  //           {message.type == null &&
  //             message.content != null &&
  //             (message.type = "TEXT")}
  //           {message.type == "TEXT" ? (
  //             message.content
  //           ) : (
  //             <MediaMessageContent mediaMeta={message.mediaFileDTO} />
  //           )}
  //           <span className="inline-block w-22 h-0"></span>
  //         </div>
  //       </div>
  //       <div className="message-time absolute right-2 bottom-1 text-[1rem]">
  //         {formattedTime}
  //       </div>
  //       {/* {isMyMessage && (
  //         <div className="message-status">
  //           {message.status == "PENDING" ? (
  //             <MdSchedule color="grey" size={16} />
  //           ) : message.status == "DELIVERED" ? (
  //             <MdDoneAll color="grey" size={16} />
  //           ) : message.status == "READ" ? (
  //             <MdDoneAll color="deepskyblue" size={16} />
  //           ) : (
  //             <IoMdAlert color="red" size={16} />
  //           )}
  //         </div>
  //       )} */}
  //     </div>
  //   );
  //

  return (
    <div
      className={`flex mb-2 px-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl `}
      >
        <div
          className={` relative px-3 py-2 rounded-2xl shadow-sm ${isOwnMessage ? "bg-[var(--accent-color)] text-white rounded-br-md" : "bg-[var(--tertiary-color)] rounded-bl-md"}`}
        >
          {/* {renderReply()} */}
          {/* {renderMedia()} */}

          {message && (
            <div className="break-words hyphens-auto leading-relaxed text-[1.5rem]">
              <span className="inline">{message.content}</span>
              <span className="inline-block w-22 h-0"></span>
            </div>
          )}

          <div className="absolute bottom-1 right-3 text-[1rem] leading-none p-1">
            {formattedTime}
          </div>
          {isOwnMessage && (
            <div className="message-status absolute right-[-20px] bottom-0">
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
      </div>
    </div>
  );
};

export default MessageBubble;
