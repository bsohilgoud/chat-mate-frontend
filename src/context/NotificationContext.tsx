import React from "react";
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Client } from "@stomp/stompjs";
import notification_sound from "../assets/notification-sound.mp3";
import { useNotification } from "../hooks/useNotification";
import { chatMessage, MessageStatusType } from "../types/chatTypes";
import { UserType } from "../types/api-response-types";

export type WSNotificationType =
  | "ONLINE_STATUS"
  | "MESSAGE_STATUS_UPDATED"
  | "BATCH_MESSAGE_STATUS_UPDATE"
  | "NEW_MESSAGE"
  | "USER_TYPING"
  | "MESSAGE_DELETED"
  | "MESSAGE_EDITED"
  | "USER_OFFLINE"
  | "USER_ONLINE"
  | "USER_JOINED"
  | "USER_LEFT"
  | "READ_RECEIPT"
  | "MESSAGE_REACTION";

interface notificationAlert {
  id?: number;
  type: string;
  displayName: string;
  message: string;
}

interface WSNotification {
  type: WSNotificationType;
  fromUser: UserType | string;
  toUser: string;
  body:
    | chatMessage
    | { messageId: number; status: MessageStatusType }
    | { fromStatus: MessageStatusType; toStatus: MessageStatusType };
}
const NotificationContext = createContext(null);
const notification_audio = new Audio(notification_sound);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthenticated } = useAuthContext();
  const {
    newChatMessage,
    updateMessageStatus,
    updateBatchMessageStatus,
    showTypingForUser,
    updateStatusForUser,
  } = useNotification();
  const [notifications, setNotifications] = useState<notificationAlert[]>([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  let ws_client: Client;

  const publicNotification = (public_notification: WSNotification) => {
    const payload = public_notification.body;
    const fromUser = public_notification.fromUser;
    if (user?.id === fromUser.id) return;

    switch (public_notification.type) {
      case "USER_OFFLINE":
        updateStatusForUser(fromUser.id, "OFFLINE");
        break;
      case "USER_ONLINE":
        notification_audio.play();
        addNotification({
          type: "online",
          displayName: fromUser.fullName,
          message: "is Now Online!!",
        });
        updateStatusForUser(fromUser.id, "ONLINE");
        break;
    }
  };

  const privateNotification = (private_notification: WSNotification) => {
    const payload = private_notification.body;
    const fromUser = private_notification.fromUser;

    switch (private_notification.type) {
      case "NEW_MESSAGE":
        notification_audio.play();
        const newMessage: chatMessage = payload;
        addNotification({
          type: "message",
          displayName: fromUser.fullName,
          message: newMessage?.content,
        });
        newChatMessage(newMessage);
        break;
      case "USER_TYPING":
        showTypingForUser(fromUser);
        break;
      case "BATCH_MESSAGE_STATUS_UPDATE":
        updateBatchMessageStatus(
          fromUser,
          payload.fromStatus,
          payload.toStatus,
        );
        break;
      case "MESSAGE_STATUS_UPDATED":
        updateMessageStatus(fromUser, payload.messageId, payload.status);
        break;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setWSConnection();
    }
  }, [user]);

  const setWSConnection = () => {
    console.log("Connecting to websocket server....");
    ws_client = new Client({
      brokerURL: "ws://localhost:8080/ws_server",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnect,
      onStompError: (frame) => {
        console.error(
          `Broker reported error: ${frame.headers["message"]} \n Additional details: ${frame.body}`,
        );
      },
      onDisconnect: () => {
        console.log("Disconnected from the WebSocket server");
      },
    });

    ws_client.activate();
  };

  const onConnect = (frame) => {
    console.log("Connected:", frame);

    // Subscribe to private messages
    ws_client?.subscribe(
      `/queue/notification/private/${user?.id}`,
      (payload) => {
        try {
          const notification: WSNotification = JSON.parse(payload.body);
          privateNotification(notification);
        } catch (e) {
          console.error("Error in receivedNewMessage:", e);
        }
      },
    );

    ws_client?.subscribe(`/queue/notification/public`, (payload) => {
      try {
        const notification: WSNotification = JSON.parse(payload.body);
        publicNotification(notification);
      } catch (e) {
        console.error("Error in receivedNewMessage:", e);
      }
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
