import { useContext, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage/ChatMessage";
import "./UserChat.scss";
import ChatBox from "./ChatBox/ChatBox";
import ChatContext from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import { fetchChatMessages } from "../../../services/api";
import { sendWSMessage } from "../../../services/websocket";

function UserChat() {
  const { chatPartner, chatMessages, setChatMessages } =
    useContext(ChatContext);

  const messagesContainerRef = useRef(null);

  // Scroll to the bottom whenever chatMessages updates
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]); // Trigger this effect whenever chatMessages changes

  useEffect(() => {
    // Fetch user chat data
    const getChatMessages = async () => {
      try {
        const userChat = await fetchChatMessages(chatPartner);
        console.log("userChat.length: " + userChat.length);
        setChatMessages(userChat);
      } catch (error) {
        console.error("Error fetching user chat data:", error);
      }
    };

    if (chatPartner != null) getChatMessages();
  }, [chatPartner]);

  if (chatPartner === undefined || chatPartner === null) {
    return <div>Loading...</div>;
  }

  if (chatMessages.length === 0) {
    return <div>No Chat Messages Found !!!</div>;
  }

  const sendChatMessage = (newMessage) => {
    const messageBody = sendWSMessage(chatPartner.userId, newMessage);
    messageBody.messageId = chatMessages.length;
    setChatMessages((chatMessages) => [...chatMessages, messageBody]);
  };

  return (
    <div className="user-chat">
      <ChatHeader chatPartner={chatPartner} />
      <div className="messages-container" ref={messagesContainerRef}>
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <ChatBox sendChatMessage={sendChatMessage} />
    </div>
  );
}

export default UserChat;
