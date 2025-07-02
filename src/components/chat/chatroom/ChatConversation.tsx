import React, { useLayoutEffect } from "react";
import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { formatMessageDateWithDay } from "../../../services/helper";
import { chatMessage } from "../../../types/chatTypes";
import MessageBubble from "./MessageBubble";
import { useChat } from "../../../hooks/useChat";
import { Divider } from "../../common/Divider";

const ChatConversation = () => {
  const { chatPartnerId, conversationList, setConversationList } =
    useChatContext();

  const { fetchChatConversations } = useChat();

  const [dateToChatMessagesMap, setDateToChatMessagesMap] = useState(new Map());

  const messagesContainerRef = useRef(null);
  useLayoutEffect(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    const dateToMessageMap: Map<string, chatMessage[]> = new Map();

    conversationList.forEach((message: chatMessage) => {
      const timestamp = formatMessageDateWithDay(message.timestamp);
      const messages = dateToMessageMap.get(timestamp);
      if (messages) {
        messages.push(message);
      } else {
        dateToMessageMap.set(timestamp, [message]);
      }
    });

    setDateToChatMessagesMap(dateToMessageMap);
  }, [conversationList, setConversationList]);

  useEffect(() => {
    if (chatPartnerId != null) fetchChatConversations(chatPartnerId);
  }, [chatPartnerId]);

  if (conversationList.length === 0) {
    return (
      <div className="messages-container flex flex-1  px-5 py-4">
        No Chat Messages Found !!!
      </div>
    );
  }

  return (
    <div
      className="messages-container flex flex-col flex-1 overflow-y-scroll h-full px-5 py-4"
      ref={messagesContainerRef}
    >
      {Array.from(dateToChatMessagesMap.entries()).map(([date, messages]) => (
        <div
          key={date}
          className="date-to-messages-container flex flex-col my-5"
        >
          <div className="relative date-divider flex w-full justify-around items-center mb-5">
            <Divider type="horizontal" className="mx-8" />
            <span className="bg-[var(--primary-color)] date-text text-[1.35rem] min-w-fit">
              {date}
            </span>
            <Divider type="horizontal" className="mx-8" />
          </div>
          {messages.map((message: chatMessage) => (
            <MessageBubble key={message.messageId} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default ChatConversation;
