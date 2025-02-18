import React, { useEffect, useState } from "react";
import "./ChatPage.scss";
import Menu from "../../components/Menu/Menu";
import { Client } from "@stomp/stompjs";
import ChatUsers from "../../components/ChatUsers/ChatUsers";
import { useLocation } from "react-router-dom";

function ChatPage() {
  const [client, setClient] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cookies, setCookies] = useState(null);
  const [usersList, setUsersList] = useState([]);


  useEffect(() => {
    // Retrieve userId and cookies from localStorage on component mount
    const storedUserId = localStorage.getItem("userId");
    // const storedCookies = localStorage.getItem("cookies");

    async function fetchData() {

      // You can await here
      const res = await fetch("http://localhost:8080/users/", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      // const
      console.log(`data : ${JSON.stringify(data)}`);

      // ...
    }

    fetchData();


    if (storedUserId) {
      setUserId(storedUserId);
      // setCookies(storedCookies);
    }
  }, []);

  // useEffect(() => {
  //   if (userId) {
  //     console.log("Trying to connect to websocket server.....");

  //     const newClient = new Client({
  //       brokerURL: "ws://localhost:8080/ws_server",
  //       // connectHeaders: {
  //       //   Cookie: cookies,
  //       // },
  //       reconnectDelay: 5000,
  //       heartbeatIncoming: 4000,
  //       heartbeatOutgoing: 4000,
  //       onConnect: (frame) => {
  //         console.log("Connected:", frame);

  //         // Subscribe to private messages
  //         newClient.subscribe(`/queue/private/${userId}`, (message) => {
  //           console.log("Got private message:", message.body);
  //         });

  //         console.log("\n\n Sending Message: \n ");

  //         // Send test message
  //         newClient.publish({
  //           destination: "/chat-mate/queue/private",
  //           body: JSON.stringify({
  //             senderId: userId,
  //             receiverId: userId,
  //             type: "MESSAGE",
  //             content: "HI SOHIL",
  //           }),
  //         });
  //       },
  //       onStompError: (frame) => {
  //         console.error("Broker reported error:", frame.headers["message"]);
  //         console.error("Additional details:", frame.body);
  //       },
  //       onDisconnect: () => {
  //         console.log("Disconnected from the WebSocket server");
  //       },
  //     });

  //     setClient(newClient);
  //     newClient.activate();
  //   }
  // }, [userId]);

  return (
    <>
      <div className="chatpage">
      {/* <div className="app-header">{"Chat Mate"}</div> */}
        <ChatUsers userslist={usersList} />
        <div className="user-chat">{"user-chat"}</div>
      </div>
    </>
  );
}

export default ChatPage;
