import "./ChatHeader.scss";
const ChatHeader = ({ chatPartner }) => {
  const shortName = chatPartner.displayName
    .split(" ")
    .map((word: string) => word[0] || "")
    .join("");

  return (
    <div className="header">
      <div className="profile-icon">{shortName}</div>
      <div className="chat-user-name">{chatPartner.displayName}</div>
    </div>
  );
};

export default ChatHeader;
