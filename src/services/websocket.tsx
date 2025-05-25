import { Client } from "@stomp/stompjs";
import { ChatMessageType } from "../context/ChatContext";
import notification_sound from "../assets/notification-sound.mp3";
import { string } from "prop-types";

let ws_client: Client;
const notification_audio = new Audio(notification_sound);

type Notitification = {
  type: string;
  fromUser: string;
  toUser: string;
  body: object;
};

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
      ws_client.subscribe(
        `/queue/notification/private/${userId}`,
        (payload) => {
          try {
            const notification: Notitification = JSON.parse(payload.body);
            console.log(notification.body);
            notification_audio.play();
            receivedNewMessage(notification.body);
          } catch (e) {
            console.error("Error in receivedNewMessage:", e);
          }
        },
      );

      ws_client.subscribe(`/queue/notification/public`, (payload) => {
        try {
          console.log(
            "Got public notification:" + JSON.stringify(payload.body),
          );
          notification_audio.play();

          console.log("Got public notification:" + payload.body);
          alert("Got public notification:" + JSON.stringify(payload.body));
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
