import React, { useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { UserType } from "../../../types/api-response-types";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { useChat } from "../../../hooks/useChat";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";

const ChatHeader = () => {
  const {
    chatPartnerId,
    chatPartner,
  }: { chatPartnerId: string; chatPartner: UserType } = useChatContext();

  const { fetchPartnerDetails } = useChat();

  useEffect(() => {
    if (chatPartnerId != null) {
      fetchPartnerDetails(chatPartnerId);
    }
  }, [chatPartnerId]);

  if (chatPartner == null) return <div> {"loading"} </div>;

  return (
    <div className="chat-header flex items-center px-4 gap-3 w-full h-[75px] bg-[var(--secondary-color)]">
      <ProfileIcon
        photoURL={chatPartner.profileUrl}
        displayName={chatPartner.fullName}
        fontSize={24}
        imageSize={42}
      />
      <div className="ml-2 name-and-status-container flex flex-col flex-1 gap-2">
        <span className="name text-[1.75rem] font-bold">
          {chatPartner.fullName}
        </span>
        <span className="online-status text-[1.25rem]">{"Online"}</span>
      </div>
      <IoVideocamOutline className="w-[32px] h-[32px] mr-4 text-[var(--text-muted)] cursor-pointer" />
      <IoCallOutline className="w-[28px] h-[28px] mr-4 text-[var(--text-muted)] cursor-pointer" />
    </div>
  );
};

export default ChatHeader;
