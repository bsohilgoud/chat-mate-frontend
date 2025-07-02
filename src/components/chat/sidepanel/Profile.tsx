import React, { useCallback, useRef, useState } from "react";
import { Divider } from "../../common/Divider";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { useAuthContext } from "../../../context/AuthContext";
import api, { logoutUser } from "../../../services/api";
import { CiMail } from "react-icons/ci";
import { formatMessageDateWithDay } from "../../../services/helper";
import { Pencil } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../../context/ChatContext";
import { useUIContext } from "../../../context/UIContext";
export const Profile = () => {
  const { user, setUser } = useAuthContext();
  const { resetAuthContext } = useAuthContext();
  const { resetChatContext } = useChatContext();
  const { resetUIContext } = useUIContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageVersion, setImageVersion] = useState(0);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteProfile = () => {
    // fileInputRef.current?.click();
  };

  const handleLogout = useCallback(async () => {
    await logoutUser();
    sessionStorage.removeItem("userId");
    resetAuthContext();
    resetChatContext();
    resetUIContext();
    navigate("/login");
  }, [navigate]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileUpload");

    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      uploadProfile(selectedFile);
    }
  };

  const uploadProfile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/users/profile/${user.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status == 200) {
      console.log(response.data.payload.profileUrl);
      const profileUrl = response.data.payload.profileUrl;
      setUser((user) => (user ? { ...user, profileUrl: profileUrl } : user)); // Learn about this
      setImageVersion((v) => v + 1);
    }
  };

  return (
    <div className="sp-header-container w-full flex flex-col py-3 gap-3">
      <div className="sp-header-text text-5xl"> My Profile </div>

      <div className="flex flex-col items-center mt-10 justify-center gap-3">
        <div className="relative profileImage flex flex-col items-center justify-center p-2 border-[0.5px] border-dashed border-[var(--border-color)] rounded-full ">
          <ProfileIcon
            displayName={user?.fullName}
            fontSize={50}
            imageSize={150}
            photoURL={user?.profileUrl}
            userId={user?.id}
            key={imageVersion}
          />
          <div
            className="absolute flex justify-center items-center bg-[var(--secondary-color)] p-3 rounded-full cursor-pointer hover:bg-grey-400 right-2 bottom-5 border-[0.5px]  border-[var(--border-color)]"
            onClick={handleEditProfile}
          >
            <Pencil size={16} />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
          <div
            className="absolute flex justify-center items-center bg-[var(--secondary-color)] p-3 rounded-full cursor-pointer hover:bg-grey-400 left-2 bottom-5 border-[0.5px]  border-[var(--border-color)]"
            onClick={handleDeleteProfile}
          >
            <FaRegTrashCan size={16} />
          </div>
        </div>
        <label className="text-[2.5rem] font-semibold">{user?.fullName}</label>
        <div className="flex gap-2 mt-3 items-center justify-center text-[var(--text-secondary)]">
          <CiMail size={18} />
          <span className="text-[1.5rem] ">{user?.username}</span>
        </div>
        <div className="flex justify-center text-[1.25rem] text-[var(--text-secondary)]">
          Joined on {formatMessageDateWithDay(user?.createdAt)}
        </div>
        <Divider type="horizontal" />

        <div
          className="flex gap-2 cursor-pointer px-5 py-3 mt-10 text-red-400 bg-[var(--tertiary-color)] rounded-lg transition-all hover:bg-red-400 hover:text-white hover:scale-105 border-[0.5px]  border-[var(--border-color)]"
          onClick={handleLogout}
        >
          <span className="font-bold"> Logout </span>
          <IoLogOutOutline size={24} />
        </div>
        {/* <div className="flex gap-2 items-center justify-center">
          <span> Active </span>
          <div className="online-status relative h-4 w-4 rounded-full bg-green-600">
            <div className="status-signal absolute h-full w-full rounded-full border-green-600 border-3 animate-ping" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
