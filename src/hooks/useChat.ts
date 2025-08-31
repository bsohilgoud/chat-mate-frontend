import React, { useCallback, useEffect, useRef } from "react";
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

export const useChat = () => {
  const { user } = useAuthContext();

  const {
    recentChats,
    chatPartnerId,
    setRecentChats,
    contactsList,
    setContactsList,
    conversationList,
    setConversationList,
    currentMessage,
    setCurrentMessage,
    chatPartner,
    setChatPartner,
  } = useChatContext();

  const contactsListRef = useRef(contactsList);
  useEffect(() => {
    contactsListRef.current = contactsList;
  }, [contactsList]);

  const chatPartnerIdRef = useRef(chatPartnerId);

  useEffect(() => {
    chatPartnerIdRef.current = chatPartnerId;
  }, [chatPartnerId]);

  const fetchAllUsers = useCallback(async () => {
    const api_response = await getUsersAPI();
    const users_list = api_response.payload;
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
    (newMessage: chatMessage) => {
      const isMyMessage = newMessage.senderId == user.id;
      const partner_id = isMyMessage
        ? newMessage.receiverId
        : newMessage.senderId;

      // const filteredSummary = recentChats.filter(
      //   (summaryMessage: conversationSummary) =>
      //     summaryMessage.partnerId === partner_id,
      // );
      // if (filteredSummary.length == 0) {
      //   let newRecentChat: conversationSummary = null
      //   // 1st message from/to partner
      //   const matchedPartners = contactsList.filter(contact => contact.id === partner_id);
      //   if (matchedPartners.length === 0)
      //     console.log("Fetch contacts again");
      //   else {
      //     newRecentChat.content = newMessage.content;
      //     newRecentChat.contentType = newMessage.type
      //     newRecentChat.senderId = newMessage.senderId
      //     newRecentChat.receiverId = newMessage.receiverId
      //     newRecentChat.newMessagesCount = 1
      //     newRecentChat.status = newMessage.status
      //     newRecentChat.timestamp = newMessage.timestamp
      //     newRecentChat.partnerProfileUrl = matchedPartners[0].profileUrl
      //     newRecentChat.partnerOnlineStatus = matchedPartners[0].onlineStatus
      //     newRecentChat.partnerLastSeen = matchedPartners[0].lastSeen
      //     newRecentChat.partnerId = matchedPartners[0].id
      //     newRecentChat.partnerFullName = matchedPartners[0].fullName
      //     }
      //   setRecentChats((prev) => [...prev, newRecentChat])
      // } else {
      setRecentChats((prevRecentChats: conversationSummary[]) => {
        const existingChat = prevRecentChats.find(
          (chat) => chat.partnerId === partner_id,
        );
        if (existingChat) {
          return prevRecentChats.map((chat) =>
            chat.partnerId === partner_id
              ? {
                  ...chat,
                  newMessagesCount:
                    isMyMessage || chatPartnerIdRef.current === partner_id
                      ? 0
                      : chat.newMessagesCount + 1,
                  content: newMessage.content,
                  senderId: newMessage.senderId,
                  receiverId: newMessage.receiverId,
                  timestamp: newMessage.timestamp,
                  status: newMessage.status,
                  contentType: newMessage.type,
                }
              : chat,
          );
        } else {
          const matchedPartner = contactsListRef.current.find(
            (contact) => contact.id === partner_id,
          );
          if (!matchedPartner) {
            console.warn(
              `Partner ${partner_id} not found in contacts list. Need to fetch the use from API Call.`,
            );
            return prevRecentChats;
          }
          const newRecentChat: conversationSummary = {
            partnerId: matchedPartner.id,
            partnerFullName: matchedPartner.fullName,
            partnerProfileUrl: matchedPartner.profileUrl,
            partnerOnlineStatus: matchedPartner.onlineStatus,
            partnerLastSeen: matchedPartner.lastSeen,
            content: newMessage.content,
            contentType: newMessage.type,
            senderId: newMessage.senderId,
            receiverId: newMessage.receiverId,
            timestamp: newMessage.timestamp,
            status: newMessage.status,
            isTyping: false,
            newMessagesCount: isMyMessage ? 0 : 1,
          };

          return [...prevRecentChats, newRecentChat];
        }
      });
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
