import { formatMessageDateWithDay } from "../../../../services/helper";
import "./ChatUserCard.scss";
const ChatUserCard = ({ conversation, handleSetChatPartner }) => {
  const currentUser = sessionStorage.getItem("userId");

  const showUserChat = (e) => {
    const previousActivePartner = document.querySelector(
      ".chat-user-card.active",
    );
    if (previousActivePartner) {
      previousActivePartner.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    handleSetChatPartner();
  };

  const formattedTime = formatMessageDateWithDay(conversation.timestamp);
  // const date = new Date(conversation.timestamp);

  // const formattedTime = date.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <div className="chat-user-card" onClick={showUserChat}>
      <div className="name-date-container">
        <div className="name">{conversation.partnerDisplayName}</div>
        <div className="date"> {formattedTime}</div>
      </div>
      <div className="message-container">
        <div className="message">
          {conversation.senderId === currentUser ? "You: " : ""}
          {conversation.content}
        </div>
        <div className="unread-count">{conversation.newMessagesCount}</div>
      </div>
    </div>
  );
};

export default ChatUserCard;
