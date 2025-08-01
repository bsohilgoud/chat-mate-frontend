import React from "react";
import { UserType } from "../../../types/authTypes";
import { CiMail } from "react-icons/ci";
import { formatMessageDateWithDay } from "../../../services/helper";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { MdClose } from "react-icons/md";

export const ChatPartnerProfile = ({
  chatPartner,
  showProfile,
  setShowUserProfile,
}: {
  chatPartner: UserType;
  showProfile: boolean;
  setShowUserProfile: (show: boolean) => void;
}) => {
  return (
    <div
      className={`${showProfile ? "flex" : "hidden"}  sp-header-container absolute z-1000 w-full md:max-w-[400px] flex-col h-full md:min-w-[400px] bg-[var(--secondary-color)] border-l-[0.5px] border-l-[var(--border-color)] px-4 py-3 right-0`}
    >
      <div className="flex items-center justify-end cursor-pointer">
        <MdClose
          className="right-5 mr-5"
          size={36}
          onClick={() => setShowUserProfile(false)}
        />
      </div>
      <div className="sp-header-text text-5xl text-center">Contact Info</div>

      {/* </div> */}
      <div className="flex flex-col items-center mt-10 justify-center gap-3">
        <div className="relative profileImage flex flex-col items-center justify-center p-2 border-[0.5px] border-dashed border-[var(--border-color)] rounded-full ">
          <ProfileIcon
            displayName={chatPartner?.fullName}
            fontSize={50}
            imageSize={150}
            photoURL={chatPartner?.profileUrl}
            userId={chatPartner?.id}
          />
        </div>
        <label className="text-[2.5rem] font-semibold">
          {chatPartner?.fullName}
        </label>
        <div className="flex gap-2 mt-3 items-center justify-center text-[var(--text-secondary)]">
          <CiMail size={18} />
          <span className="text-[1.5rem] ">{chatPartner?.username}</span>
        </div>
        <div className="flex justify-center text-[1.25rem] text-[var(--text-secondary)]">
          Joined on {formatMessageDateWithDay(chatPartner?.createdAt)}
        </div>
      </div>
    </div>
  );
};
