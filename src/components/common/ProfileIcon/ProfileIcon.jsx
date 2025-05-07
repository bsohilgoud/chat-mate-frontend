import React from "react";

const ProfileIcon = ({ photoURL, displayName, fontSize, imageSize }) => {
  const shortName = displayName
    .split(" ")
    .map((word) => word[0] || "")
    .join("");

  return (
    <div
      className="profile-icon"
      style={{
        height: imageSize + "px",
        width: imageSize + "px",
        fontSize: fontSize + "px",
        borderRadius: "50%",
        backgroundColor: "var(--tertiary-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {shortName}
    </div>
  );
};

export default ProfileIcon;
