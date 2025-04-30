import "./ChatMessage.scss";
import { MdDoneAll } from "react-icons/md";

const ChatMessage = ({ message }) => {
  // console.log("message", JSON.stringify(message));
  const isMyMessage = message.senderId == sessionStorage.getItem("userId");
  const chatMessageClassName = isMyMessage
    ? "chat-message my-message"
    : "chat-message";

  // Convert the LocalDateTime string to a Date object
  const date = new Date(message.timestamp);

  // Format the time as HH:mm:ss
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={chatMessageClassName}>
      <div className="message-content">{message.content}</div>
      <div className="message-time">{formattedTime}</div>
      {isMyMessage && (
        <div className="message-status">
          <MdDoneAll color="deepskyblue" size={10} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
