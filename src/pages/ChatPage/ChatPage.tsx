import React from "react";
import { useEffect } from "react";
import "./ChatPage.scss";
import UserChat from "../../components/features/UserChat/UserChat";
import { connectToWS } from "../../services/websocket";
import { useNavigate } from "react-router-dom";
import ChatUsers from "../../components/features/UsersList/ChatUsers/ChatUsers";
import { useChatOperations } from "../../hooks/useChat";
import Menu from "../../components/Menu/Menu";

function ChatPage() {
  const navigate = useNavigate();
  const { receivedChatMessage } = useChatOperations();

  useEffect(() => {
    console.log("Connection to WebSocket Server.....");
    const userId = sessionStorage.getItem("userId");
    if (userId == undefined) navigate("/login");
    else connectToWS(userId, receivedChatMessage);
  }, []);

  return (
    <div className="chatpage">
      <Menu />
      {/* <div className="app-header">{"Chat Mate"}</div> */}
      <ChatUsers />
      <UserChat />
    </div>
  );
}

export default ChatPage;
