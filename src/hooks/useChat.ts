import React, { useCallback } from "react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import {
  getUsersAPI,
  getMessagesSummaryAPI,
  getPartnerDetailsAPI,
  getChatMessagesAPI,
  postMessageAPI,
  batchMessageStatusUpdateAPI,
  updateMessageStatusAPI,
  getMediaFile,
  getMediaFileAPI,
} from "../services/api";
import { chatMessage, conversationSummary } from "../types/chatTypes";
import { Pi } from "lucide-react";

export const useChat = () => {
  const { user } = useAuthContext();

  const {
    recentChats,
    chatPartnerId,
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

  const fetchMediaFile = useCallback(async (media_file_name: string) => {
    const bytes = await getMediaFileAPI(media_file_name);
    return bytes;
  }, []);

  const sendChatMessage = useCallback(
    async (message: string, partner_id: string) => {
      let chatMessage: chatMessage = {
        messageId: null,
        senderId: user.id,
        receiverId: partner_id,
        content: message,
        type: "TEXT",
        status: "PENDING",
        timestamp: new Date().toISOString(),
      };

      const api_response = await postMessageAPI(chatMessage);
      chatMessage = api_response.payload;
      reloadSummaryAndMessages(chatMessage);
    },
    [user],
  );

  const reloadSummaryAndMessages = useCallback(
    (chatMessage: chatMessage) => {
      setConversationList((chatConversations: chatMessage[]) => [
        ...chatConversations,
        chatMessage,
      ]);

      updateChatSummary(chatMessage);
    },
    [conversationList],
  );

  const updateChatSummary = useCallback(
    (chatMessage: chatMessage) => {
      const isMyMessage = chatMessage.senderId == user.id;
      const partner_id = isMyMessage
        ? chatMessage.receiverId
        : chatMessage.senderId;

      // const filteredSummary = recentChats.filter(
      //   (summaryMessage: conversationSummary) =>
      //     summaryMessage.partnerId === partner_id,
      // );
      // if (filteredSummary.length == 0) {
      //   // 1st message from/to partner
      //   // Fetch user details from Contacts List
      // } else {
      setRecentChats((recentChats: conversationSummary[]) =>
        recentChats.map((conversation) =>
          conversation.partnerId === partner_id
            ? {
                ...conversation,
                newMessagesCount: isMyMessage
                  ? 0
                  : conversation.newMessagesCount + 1,
                content: chatMessage.content,
                senderId: chatMessage.senderId,
                receiverId: chatMessage.receiverId,
                timestamp: chatMessage.timestamp,
                status: chatMessage.status,
              }
            : conversation,
        ),
      );
      // }
    },
    [recentChats, setRecentChats, user],
  );

  return {
    fetchAllUsers,
    fetchRecentChats,
    fetchPartnerDetails,
    fetchChatConversations,
    sendChatMessage,
    updateChatSummary,
    fetchMediaFile,
    reloadSummaryAndMessages,
  };
};
