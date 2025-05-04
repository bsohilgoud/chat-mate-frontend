import { useCallback, useEffect, useRef } from "react";
import {
  ChatMessageType,
  useChatContext,
  LastConversationType,
} from "../context/ChatContext";
import { sendNewChatMessage, updateMessageStatus } from "../services/api";

export const useChatOperations = () => {
  const {
    chatMessages,
    setChatMessages,
    chatPartner,
    lastConversations,
    setLastConversations,
  } = useChatContext();

  // Keep the ref updated with the latest context value
  const chatPartnerRef = useRef(chatPartner);
  useEffect(() => {
    chatPartnerRef.current = chatPartner;
  }, [chatPartner]);

  const receivedChatMessage = useCallback(
    (newMessage: ChatMessageType) => {
      const chatPartner = chatPartnerRef.current;
      console.log(
        "Inside receivedChatMessage >> Received new message:",
        newMessage,
      );
      if (!chatPartner) return;

      const isMessageFromChatPartner: boolean =
        chatPartner.userId === newMessage.senderId;

      if (isMessageFromChatPartner) {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        updateMessageStatus(newMessage.messageId, "READ");
      }

      setLastConversations((prevConversations: LastConversationType[]) =>
        prevConversations.map((conversation) =>
          conversation.partnerId === newMessage.senderId
            ? {
                ...conversation,
                newMessagesCount: isMessageFromChatPartner
                  ? 0
                  : conversation.newMessagesCount + 1,
                content: newMessage.content,
                senderId: newMessage.senderId,
                receiverId: newMessage.receiverId,
                timestamp: newMessage.timestamp,
                status: newMessage.status,
              }
            : conversation,
        ),
      );
    },
    [chatPartner, setChatMessages, setLastConversations],
  );

  const sendChatMessage = useCallback(
    (content: string) => {
      if (!chatPartner) return;
      (async () => {
        const savedMessage = await sendNewChatMessage(
          chatPartner.userId,
          content,
        );
        console.log(savedMessage);
        setChatMessages((prev) => [...prev, savedMessage]);

        return savedMessage;
      })();
    },
    [chatPartner, setChatMessages],
  );

  return {
    chatMessages,
    chatPartner,
    lastConversations,
    receivedChatMessage,
    updateMessageStatus,
    sendChatMessage,
  };
};
