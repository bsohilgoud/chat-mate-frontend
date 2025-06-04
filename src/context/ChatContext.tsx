import React, { useState } from "react";
import { conversationSummary } from "../types/chatTypes";
import { UserType } from "../types/authTypes";

const ChatContext = React.createContext(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentChats, setRecentChats] = useState<conversationSummary[]>([]);
  const [contactsList, setContactsList] = useState<UserType[]>([]);
  const [conversationList, setConversationList] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState<string>("");
  const [chatPartnerId, setChatPartnerId] = React.useState();
  const [chatPartner, setChatPartner] = React.useState();

  const value = {
    recentChats,
    setRecentChats,
    contactsList,
    setContactsList,
    conversationList,
    setConversationList,
    currentMessage,
    setCurrentMessage,
    chatPartnerId,
    setChatPartnerId,
    chatPartner,
    setChatPartner,
  };

  // Initialize WebSocket client
  const ws_client = null; // Replace with your actual WebSocket implementation

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Helper hook for consuming context
export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
