import "./ChatBox.css";
import { CiFaceSmile } from "react-icons/ci";
import { MdSend } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { FaImage } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { useState } from "react";

const ChatBox = ({ sendChatMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Ensure the message isn't empty
      sendChatMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="chat-box">
      <div className="icon">
        <FaSmile />
      </div>
      <div className="icon">
        <FaImage />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="icon">
        <MdSend onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;
