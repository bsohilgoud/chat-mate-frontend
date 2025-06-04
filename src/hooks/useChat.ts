import React, { useCallback } from "react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import {
  getUsersAPI,
  getMessagesSummaryAPI,
  getPartnerDetailsAPI,
  getChatMessagesAPI,
} from "../services/api";

export const useChat = () => {
  const { user } = useAuthContext();

  const {
    setRecentChats,
    setContactsList,
    conversationList,
    setConversationList,
    currentMessage,
    setCurrentMessage,
    chatPartner,
    setChatPartner,
  } = useChatContext();

  const fetchAllUsers = useCallback(async () => {
    const api_response = await getUsersAPI();
    const users_list = api_response.payload;
    console.log("contacts : " + users_list);
    setContactsList(users_list);
  }, []);

  const fetchRecentChats = useCallback(async () => {
    const api_response = await getMessagesSummaryAPI();
    const recent_chats = api_response.payload;
    setRecentChats(recent_chats);
  }, []);

  const getCurrentUserId = useCallback(() => {
    return user.id;
  }, []);

  const fetchPartnerDetails = useCallback(async (partner_id: string) => {
    const api_response = await getPartnerDetailsAPI(partner_id);
    const chatPartnerDTO = api_response.payload;
    setChatPartner(chatPartnerDTO);
  }, []);

  const fetchChatConversations = useCallback(async (partner_id: string) => {
    const api_response = await getChatMessagesAPI(partner_id);
    const chatConversations = api_response.payload;
    setConversationList(chatConversations);
  }, []);

  return {
    fetchAllUsers,
    fetchRecentChats,
    fetchPartnerDetails,
    fetchChatConversations,
    getCurrentUserId,
  };
};
