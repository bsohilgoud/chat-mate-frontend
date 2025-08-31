import { useCallback, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import {
  chatMessage,
  conversationSummary,
  MessageStatusType,
} from "../types/chatTypes";
import { useChat } from "./useChat";
import { sendNotificationAPI, updateMessageStatusAPI } from "../services/api";

export const useNotification = () => {
  const { user } = useAuthContext();

  const {
    recentChats,
    chatPartnerId,
    setChatPartnerId,
    setRecentChats,
    setContactsList,
    conversationList,
    setConversationList,
    showChatPartnerIsTyping,
    setShowChatPartnerIsTyping,
    setChatPartner,
  } = useChatContext();

  const { updateChatSummary } = useChat();

  const chatPartnerIdRef = useRef(chatPartnerId);
  chatPartnerIdRef.current = chatPartnerId;

  const addMessageToConversationList = useCallback(
    (message: chatMessage) => {
      if (message.senderId == chatPartnerIdRef.current) {
        setConversationList((chatConversations: chatMessage[]) => [
          ...chatConversations,
          message,
        ]);
        updateMessageStatusAPI(message.messageId, "READ");
      }
    },
    [setConversationList],
  );

  const updateMessageStatus = useCallback(
    (fromUser: string, messageId: number, status: MessageStatusType) => {
      if (fromUser == chatPartnerIdRef.current) {
        setConversationList((chatMessages) =>
          chatMessages.map((message) =>
            message.messageId == messageId
              ? { ...message, status: status }
              : message,
          ),
        );
      }
    },
    [],
  );

  const updateBatchMessageStatus = useCallback(
    (
      fromUser: string,
      fromStatus: MessageStatusType,
      toStatus: MessageStatusType,
    ) => {
      if (fromUser == chatPartnerIdRef.current) {
        setConversationList((chatMessages) =>
          chatMessages.map((chatMessage) =>
            chatMessage.status === fromStatus
              ? { ...chatMessage, status: toStatus }
              : chatMessage,
          ),
        );
      }
    },
    [],
  );

  const newChatMessage = useCallback(
    (newMessage: chatMessage) => {
      updateChatSummary(newMessage);
      addMessageToConversationList(newMessage);
    },
    [addMessageToConversationList, updateChatSummary],
  );

  const sendUserTypingNotification = useCallback(() => {
    sendNotificationAPI(chatPartnerIdRef.current, user?.id, "USER_TYPING");
  }, [user]);

  const showTypingForUser = useCallback((fromUser: string) => {
    if (chatPartnerIdRef.current === fromUser) {
      setShowChatPartnerIsTyping(true);
      setTimeout(() => {
        setShowChatPartnerIsTyping(false);
      }, 5000);
    }

    setRecentChats((prevRecentChats: conversationSummary[]) =>
      prevRecentChats.map((chat) =>
        chat.partnerId === fromUser ? { ...chat, isTyping: true } : chat,
      ),
    );

    // setTimeout(() => {
    //   setRecentChats((prevRecentChats: conversationSummary[]) =>
    //     prevRecentChats.map((chat) =>
    //       chat.partnerId === fromUser ? { ...chat, isTyping: false } : chat,
    //     ),
    //   );
    // }, 5000);
  }, []);

  const updateStatusForUser = useCallback(
    (fromUser: string, status: "ONLINE" | "OFFLINE") => {
      if (chatPartnerIdRef.current === fromUser) {
        setChatPartner((partner) => ({ ...partner, onlineStatus: status }));
      }
    },
    [],
  );

  return {
    newChatMessage,
    updateMessageStatus,
    updateBatchMessageStatus,
    sendUserTypingNotification,
    showTypingForUser,
    updateStatusForUser,
  };
};
