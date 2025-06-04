import React from "react";

const ProfileIcon = ({
  photoURL,
  displayName,
  fontSize,
  imageSize,
  onlineStatus,
}) => {
  const initials =
    displayName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const styles = "";

  return (
    <div
      className="flex relative items-center justify-center rounded-full flex-shrink-0 font-medium"
      style={{
        height: imageSize + "px",
        width: imageSize + "px",
        fontSize: fontSize + "px",
        backgroundColor: "var(--tertiary-color)",
        border: "0.3px solid var(--border-color)",
      }}
    >
      {photoURL ? (
        <img
          src={photoURL}
          alt={displayName}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <span
        className={photoURL ? "hidden" : "flex items-center justify-center"}
      >
        {initials}
      </span>
      <div className="online-status-container absolute right-1 bottom-0">
        <div className="online-status relative h-4 w-4 rounded-full bg-green-600">
          <div className="status-signal absolute h-full w-full rounded-full border-green-600 border-3 animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
