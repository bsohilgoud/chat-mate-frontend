import React, { memo } from "react";
import { FaRegImage } from "react-icons/fa6";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { formatMessageDateWithDay } from "../../../services/helper";
import { IoMdAlert } from "react-icons/io";
import { MdSchedule, MdDoneAll } from "react-icons/md";
import { MessageStatusType } from "../../../types/chatTypes";
import { TypingIndicator } from "../../common/TypingIndicator";

type CommonProps = {
  partnerId: string;
  profileUrl: string;
  fullName: string;
  lastSeen: string;
  isTyping: boolean;
  onlineStatus: "ONLINE" | "OFFLINE";
  onClick: () => void;
};

type ChatCardProps = {
  type: "chat";
  timestamp: string;
  senderId: string;
  contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
  content: string;
  newMessagesCount: number;
  status: MessageStatusType;
  currentUserId: string;
} & CommonProps;

type ContactCardProps = {
  type: "contact";
} & CommonProps;

type Props = ChatCardProps | ContactCardProps;

const ChatUserCard = memo((props: Props) => {
  return (
    <div
      className="flex items-center px-2 rounded-md hover:bg-[var(--hover-color)] cursor-pointer"
      onClick={props.onClick}
    >
      <ProfileIcon
        displayName={props.fullName}
        photoURL={props.profileUrl}
        fontSize={24}
        imageSize={48}
        onlineStatus={props.onlineStatus}
        userId={props.partnerId}
      />
      <div className="conversation-container flex flex-col py-4 flex-1 ml-5 min-w-0 gap-2 border-b-[0.5px] border-b-[var(--border-color)]">
        <div className="name-date-container flex items-center justify-between mb-1">
          <div className="name font-semibold">{props.fullName}</div>

          {props.type === "chat" && (
            <div className="date text-[1.25rem] text-gray-500 flex-shrink-0 ml-2">
              {formatMessageDateWithDay(props.timestamp, true)}
            </div>
          )}
        </div>

        {props.isTyping && (
          <div className="flex">
            <span className="text-[var(--accent-color)]">typing</span>{" "}
            <TypingIndicator />{" "}
          </div>
        )}
        {!props.isTyping && (
          <div className="message-container flex items-center justify-between">
            <div className="message flex items-center min-w-0">
              <div className="m-0 text-[1.25rem] truncate">
                {props.type === "chat" ? (
                  <div className="flex gap-2">
                    {props.senderId === props.currentUserId ? "You: " : ""}
                    {props.contentType === "TEXT" ? (
                      props.content?.length > 35 ? (
                        props.content.slice(0, 35) + "..."
                      ) : (
                        props.content
                      )
                    ) : (
                      <span className="flex gap-1">
                        <FaRegImage size={16} className="ml-1 text-gray-500" />
                        <span className="ml-1">Photo</span>
                      </span>
                    )}
                  </div>
                ) : (
                  "Hey! I am using ChatMate"
                )}
              </div>
            </div>
            {props.type === "chat" && (
              <div className="unread-count flex-shrink-0 ml-2">
                {props.senderId === props.currentUserId ? (
                  <span className="">
                    {props.status == "PENDING" ? (
                      <MdSchedule color="grey" size={16} />
                    ) : props.status == "DELIVERED" ? (
                      <MdDoneAll color="grey" size={16} />
                    ) : props.status == "READ" ? (
                      <MdDoneAll className="text-green-500" size={16} />
                    ) : (
                      <IoMdAlert color="red" size={16} />
                    )}
                  </span>
                ) : (
                  props.newMessagesCount > 0 && (
                    <span
                      className="flex items-center justify-center w-8 h-8 text-[1.25rem] font-bold text-white bg-[var(--accent-color)] rounded-full min-w-[20px] h-5"
                      style={{ background: "var(--bg-gradient)" }}
                    >
                      {props.newMessagesCount}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ChatUserCard.displayName = "ChatUserCard";
export default ChatUserCard;
