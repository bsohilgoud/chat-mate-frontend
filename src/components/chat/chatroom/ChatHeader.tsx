import React, { useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { useChat } from "../../../hooks/useChat";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../types/authTypes";

const ChatHeader = ({ onBack }: { onBack: () => void }) => {
  const {
    chatPartnerId,
    chatPartner,
  }: { chatPartnerId: string; chatPartner: UserType } = useChatContext();
  const navigate = useNavigate();

  const { fetchPartnerDetails } = useChat();

  useEffect(() => {
    if (chatPartnerId != null) {
      fetchPartnerDetails(chatPartnerId);
    }
  }, [chatPartnerId]);

  // useEffect(() => {
  //   console.log("Chat Partner status changed: " + JSON.stringify(chatPartner));
  // }, [chatPartner]);

  if (chatPartner == null) return <div> {"loading"} </div>;

  // const handleBack = () => {
  //   navigate("/chat");
  // };

  return (
    <div className="chat-header border-b-[0.5px] border-b-[var(--border-color)] flex items-center px-4 gap-3 w-full h-[75px] bg-[var(--secondary-color)]">
      <FaArrowLeft className="mr-5 md:hidden" size={24} onClick={onBack} />
      <ProfileIcon
        photoURL={chatPartner.profileUrl}
        displayName={chatPartner.fullName}
        fontSize={24}
        imageSize={42}
        onlineStatus={chatPartner.onlineStatus}
        userId={chatPartner.id}
      />
      <div className="ml-2 name-and-status-container flex flex-col flex-1 gap-2">
        <span className="name text-[1.75rem] font-bold">
          {chatPartner.fullName}
        </span>
        <span className="online-status text-[1.25rem]">
          {chatPartner.onlineStatus.toLowerCase()}
        </span>
      </div>
      <IoVideocamOutline className="w-[32px] h-[32px] mr-4 text-[var(--text-muted)] cursor-pointer" />
      <IoCallOutline className="w-[28px] h-[28px] mr-4 text-[var(--text-muted)] cursor-pointer" />
    </div>
  );
};

export default ChatHeader;
