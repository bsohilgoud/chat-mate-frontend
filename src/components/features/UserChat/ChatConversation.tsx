import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../../../context/ChatContext";
import type { ChatMessageType as ChatMessageType } from "../../../context/ChatContext";
import ChatMessage from "./ChatMessage/ChatMessage";
import "./ChatConversation.scss";
import { fetchChatMessages } from "../../../services/api";
import { formatMessageDateWithDay } from "../../../services/helper";

const ChatConversation = () => {
  const chatContext = useContext(ChatContext);
  if (!chatContext) throw Error("No ChatContext");

  const { chatPartner, chatMessages, setChatMessages } = chatContext;

  const [dateToChatMessagesMap, setDateToChatMessagesMap] = useState(new Map());

  const messagesContainerRef = useRef(null);
  useLayoutEffect(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    const dateToMessageMap: Map<string, ChatMessageType[]> = new Map();

    chatMessages.forEach((message) => {
      const timestamp = formatMessageDateWithDay(message.timestamp);
      const messages = dateToMessageMap.get(timestamp);
      if (messages) {
        messages.push(message);
      } else {
        dateToMessageMap.set(timestamp, [message]);
      }
    });

    setDateToChatMessagesMap(dateToMessageMap);
  }, [chatMessages, setChatMessages]);

  useEffect(() => {
    const getChatMessages = async () => {
      if (chatPartner != null) {
        try {
          const userChat = await fetchChatMessages(chatPartner);
          setChatMessages(userChat);
        } catch (error) {
          console.error("Error fetching user chat data:", error);
        }
      }
    };

    getChatMessages();
  }, [chatPartner]);

  if (chatMessages.length === 0) {
    return <div>No Chat Messages Found !!!</div>;
  }

  return (
    <div id="messages-container" ref={messagesContainerRef}>
      {Array.from(dateToChatMessagesMap.entries()).map(([date, messages]) => (
        <div key={date} className="date-to-messages-container">
          <div className="date-divider">
            <div className="divider-line"></div>
            <span className="date-text">{date}</span>
            <div className="divider-line"></div>
          </div>
          {messages.map((message: ChatMessageType) => (
            <ChatMessage key={message.messageId} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default ChatConversation;
