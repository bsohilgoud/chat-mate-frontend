import { Client } from "@stomp/stompjs";
import { ChatMessageType } from "../context/ChatContext";

let ws_client;

export const connectToWS = (
  userId: string,
  receivedNewMessage: (message: ChatMessageType) => void,
) => {
  ws_client = new Client({
    brokerURL: "ws://localhost:8080/ws_server",
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log("Connected:", frame);

      // Subscribe to private messages
      ws_client.subscribe(`/queue/private/${userId}`, (payload) => {
        try {
          console.log("Got private message:", payload.body);
          receivedNewMessage(JSON.parse(payload.body));
          console.log("After calling receivedNewMessage");
        } catch (e) {
          console.error("Error in receivedNewMessage:", e);
        }
      });

      console.log("Subscribed to private messages");
    },
    onStompError: (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    },
    onDisconnect: () => {
      console.log("Disconnected from the WebSocket server");
    },
  });

  ws_client.activate();
};
