import React, { SetStateAction, useState } from "react";
import { chatMessage, conversationSummary } from "../types/chatTypes";
import { UserType } from "../types/authTypes";
import { Dispatch } from "@reduxjs/toolkit";

type ChatContextType = {
  recentChats: conversationSummary[];
  setRecentChats: React.Dispatch<React.SetStateAction<conversationSummary[]>>;
  contactsList: UserType[];
  setContactsList: React.Dispatch<React.SetStateAction<UserType[]>>;
  conversationList: chatMessage[];
  setConversationList: React.Dispatch<React.SetStateAction<chatMessage[]>>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  chatPartnerId: string | undefined;
  setChatPartnerId: React.Dispatch<React.SetStateAction<string | undefined>>;
  chatPartner: UserType | undefined;
  setChatPartner: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  unReadMessagesCount: number;
  setUnReadMessagesCount: React.Dispatch<React.SetStateAction<number>>;
  showChatPartnerIsTyping: boolean;
  setShowChatPartnerIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentChats, setRecentChats] = useState<conversationSummary[]>([]);
  const [contactsList, setContactsList] = useState<UserType[]>([]);
  const [conversationList, setConversationList] = React.useState<chatMessage[]>(
    [],
  );
  const [currentMessage, setCurrentMessage] = React.useState<string>("");
  const [chatPartnerId, setChatPartnerId] = React.useState();
  const [chatPartner, setChatPartner] = React.useState();
  const [unReadMessagesCount, setUnReadMessagesCount] = useState<number>();
  const [showChatPartnerIsTyping, setShowChatPartnerIsTyping] =
    useState<boolean>(false);

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
    unReadMessagesCount,
    setUnReadMessagesCount,
    showChatPartnerIsTyping,
    setShowChatPartnerIsTyping,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
