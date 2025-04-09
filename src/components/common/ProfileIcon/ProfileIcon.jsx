import "./ProfileIcon.scss";

const ProfileIcon = (userName) => {
  const shortName = userName.displayName
    .split(" ")
    .map((word) => word[0] || "")
    .join("");

  return <div className="profile-icon">{shortName}</div>;
};

export default ProfileIcon;
