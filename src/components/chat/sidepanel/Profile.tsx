import React, { useRef, useState } from "react";
import { Divider } from "../../common/Divider";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { InputField } from "../../Auth/InputField";
import { useAuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
export const Profile = () => {
  const { user, setUser } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageVersion, setImageVersion] = useState(0);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

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
      <div className="sp-header-text text-5xl"> Profile </div>

      <div className="profileImage w-full flex items-center mt-10 justify-center hover:opacity-50">
        <ProfileIcon
          displayName={user?.fullName}
          fontSize={50}
          imageSize={150}
          photoURL={user?.profileUrl}
          userId={user?.id}
          key={imageVersion}
        />
        <div
          className="absolute flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer hover:bg-grey-400"
          onClick={handleIconClick}
        >
          <div className="w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            {"upload photo"}
          </div>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <Divider
        type="horizontal"
        withContent={"Active"}
        contentClassName="px-5"
        bgColor="var(--secondary-color)"
      />
      {/* <div className="details w-full">
        <InputField type="text" value={user?.fullName} onChange={() => {}} />
      </div> */}

      {/* Change input fields */}
    </div>
  );
};
