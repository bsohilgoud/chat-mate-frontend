import React, { memo, useEffect, useState } from "react";
import { useMediaPreview } from "../../../context/MediaPreviewContext";
import { useMediaStore } from "../../../hooks/useMediaStore";

type ProfileIconProps = {
  photoURL?: string;
  displayName: string;
  fontSize?: string | number;
  imageSize?: string | number;
  onlineStatus?: "ONLINE" | "OFFLINE";
  className?: string;
  userId?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ProfileIcon = memo((props: ProfileIconProps) => {
  const initials =
    props.displayName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const [imageUrl, setImageUrl] = useState(null);
  const { showPreview } = useMediaPreview();
  const { loadProfileImageBlob } = useMediaStore();

  useEffect(() => {
    const fetchImage = async () => {
      if (!props.photoURL?.includes("upload")) {
        setImageUrl(props.photoURL);
      } else if (props.userId) {
        const url = await loadProfileImageBlob(props.userId);
        setImageUrl(url);
      }
    };
    fetchImage();
  }, [props.photoURL]);

  return (
    <div
      className={`flex relative items-center justify-center rounded-full flex-shrink-0 font-medium ${props.className}`}
      style={{
        height: props.imageSize + "px",
        width: props.imageSize + "px",
        fontSize: props.fontSize + "px",
        backgroundColor: "var(--tertiary-color)",
        border: "0.3px solid var(--border-color)",
      }}
      onClick={props.onClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={props.displayName}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <span
        className={imageUrl ? "hidden" : "flex items-center justify-center"}
      >
        {initials}
      </span>
      <div
        className={`online-status-container absolute right-1 bottom-0 ${props.onlineStatus === "ONLINE" ? "" : "hidden"} `}
      >
        <div className="online-status relative h-4 w-4 rounded-full bg-green-600">
          <div className="status-signal absolute h-full w-full rounded-full border-green-600 border-3 animate-ping" />
        </div>
      </div>
    </div>
  );
});

ProfileIcon.displayName = "ProfileIcon";

export default ProfileIcon;
