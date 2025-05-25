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
        const user_id = sessionStorage.getItem("userId");
        const unique_id = Date.now();
        const newMessage = {
          messageId: unique_id,
          senderId: user_id,
          receiverId: chatPartner.userId,
          type: "TEXT",
          content: content,
          timestamp: new Date().toISOString(),
        };

        // Add pending message
        setChatMessages((prev) => [...prev, newMessage]);
        try {
          const savedMessage = await sendNewChatMessage(newMessage);
          console.log("Delivered Message: " + JSON.stringify(savedMessage));
          // Update pending message with the delivered message.
          setChatMessages((prevMsgs) =>
            prevMsgs.map((msg) =>
              msg.messageId == unique_id ? savedMessage : msg,
            ),
          );
        } catch (error) {
          // Update pending message with the error status.
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.messageId === unique_id ? { ...msg, status: "FAILED" } : msg,
            ),
          );
        }
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
