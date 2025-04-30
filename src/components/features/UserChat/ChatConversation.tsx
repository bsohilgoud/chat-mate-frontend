import { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../../../context/ChatContext";
import ChatMessage from "./ChatMessage/ChatMessage";
import "./ChatConversation.scss";
import { fetchChatMessages } from "../../../services/api";
import { formatMessageDateWithDay } from "../../../services/helper";

const ChatConversation = () => {
  const { chatPartner, chatMessages, setChatMessages } =
    useContext(ChatContext);

  const [dateToChatMessagesMap, setDateToChatMessagesMap] = useState(new Map());

  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }

    const dateToMessageMap = new Map();
    chatMessages.forEach((message) => {
      const timestamp = formatMessageDateWithDay(message.timestamp);
      dateToMessageMap.has(timestamp)
        ? dateToMessageMap.get(timestamp).push(message)
        : dateToMessageMap.set(timestamp, [message]);
    });

    setDateToChatMessagesMap(dateToMessageMap);
  }, [chatMessages]);

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const userChat = await fetchChatMessages(chatPartner);
        setChatMessages(userChat);
      } catch (error) {
        console.error("Error fetching user chat data:", error);
      }
    };

    if (chatPartner != null) getChatMessages();
  }, [chatPartner]);

  if (chatMessages.length === 0) {
    return <div>No Chat Messages Found !!!</div>;
  }

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      {Array.from(dateToChatMessagesMap.entries()).map(([date, messages]) => (
        <div key={date} className="date-to-messages-container">
          <div className="date-divider">
            <div className="divider-line"></div>
            <span className="date-text">{date}</span>
            <div className="divider-line"></div>
          </div>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default ChatConversation;
