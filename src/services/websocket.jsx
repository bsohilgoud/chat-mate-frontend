import { Client } from "@stomp/stompjs";

let ws_client;
let user_id;

export const connectToWS = (userId, receivedUserMessage) => {
  user_id = userId;
  ws_client = new Client({
    brokerURL: "ws://localhost:8080/ws_server",
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log("Connected:", frame);

      console.log("Subscribing to private messages");
      // Subscribe to private messages
      ws_client.subscribe(`/queue/private/${user_id}`, (message) => {
        console.log("Got private message:", message.body);
        receivedUserMessage(JSON.parse(message.body));
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

export const sendWSMessage = (receiverId, content) => {
  console.log("Send");
  const body = JSON.stringify({
    senderId: user_id,
    receiverId: receiverId,
    type: "TEXT",
    content: content,
    timestamp: new Date().toISOString(),
  });

  console.log(`\n\n Sending Message: \n ${body}`);
  // Send test message
  ws_client.publish({
    destination: "/chat-mate/queue/private",
    body: body,
  });

  return JSON.parse(body);
};
