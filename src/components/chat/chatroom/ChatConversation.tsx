import React, { useLayoutEffect } from "react";
import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { formatMessageDateWithDay } from "../../../services/helper";
import { chatMessage } from "../../../types/chatTypes";
import MessageBubble from "./MessageBubble";
import { useChat } from "../../../hooks/useChat";
import { Divider } from "../../common/Divider";
import { useParams } from "react-router-dom";
import { RiStackFill } from "react-icons/ri";
import { useUIContext } from "../../../context/UIContext";

const ChatConversation = () => {
  const { conversationList, setConversationList } = useChatContext();
  const { partnerId } = useParams<{ partnerId?: string }>();
  const { sendChatMessage, fetchChatConversations } = useChat();
  const { selectedMenu, setSelectedMenu } = useUIContext();

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
    if (partnerId != null) fetchChatConversations(partnerId);
  }, [partnerId]);

  const handleQuickReply = (reply: string) => {
    sendChatMessage(reply, partnerId);
    if (selectedMenu !== "chats")
      setTimeout(() => setSelectedMenu("chats"), 1000);
  };

  if (conversationList.length === 0) {
    const quickReplies = ["Hi! 👋", "Hello there!", "How's your day going?"];
    return (
      <div
        className={`flex flex-col h-full flex-1 p-4 gap-3 justify-center items-center`}
      >
        <div className="flex items-center justify-center text-center p-4 rounded-full border-[0.5px] border-dashed border-[var(--accent-color)]">
          <RiStackFill size={42} color="var(--text-primary)" />
        </div>
        <span className="flex items-center justify-center font-semibold text-[2rem] text-center text-[var(--text-primary)] my-2">
          {"Start your conversation"}
        </span>
        <span className="flex items-center justify-center font-semibold text-[1.5rem] text-center text-[var(--text-secondary)] mb-3">
          {`This is the beginning of your conversation with`}
        </span>
        <div className="flex flex-col gap-3">
          {quickReplies.map((reply, index) => (
            <div
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="min-w-[70px] bg-[var(--border-color)] text-center px-4 py-3 rounded-full text-[1.5rem] cursor-pointer hover:bg-[linear-gradient(135deg,_#7c5aff_0%,_#3b82f6_100%)] hover:scale-105 transition-transform hover:text-white"
            >
              {reply}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto px-4 py-4 overflow-x-hidden"
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
