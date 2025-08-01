import React from "react";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../types/authTypes";

const ChatHeader = ({
  chatPartner,
  setShowUserProfile,
}: {
  chatPartner: UserType;
  setShowUserProfile: (show: boolean) => void;
}) => {
  const navigate = useNavigate();

  if (chatPartner == null) return <div> {"loading"} </div>;

  return (
    <div className="chat-header border-b-[0.5px] border-b-[var(--border-color)] flex items-center px-4 gap-3 w-full h-[75px] bg-[var(--secondary-color)]">
      <FaArrowLeft
        className="mr-5 md:hidden"
        size={24}
        onClick={() => navigate("/chat")}
      />
      <ProfileIcon
        displayName={chatPartner.fullName}
        photoURL={chatPartner.profileUrl}
        fontSize={24}
        imageSize={42}
        onlineStatus={chatPartner.onlineStatus}
        userId={chatPartner.id}
        onClick={() => setShowUserProfile(true)}
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
