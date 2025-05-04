import React from "react";
import ChatBox from "./ChatBox/ChatBox";
import { useChatContext } from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatConversation from "./ChatConversation";

function UserChat() {
  const { chatPartner } = useChatContext();

  if (chatPartner === undefined || chatPartner === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="user-chat"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <ChatHeader chatPartner={chatPartner} />
      <ChatConversation />
      <ChatBox />
    </div>
  );
}

export default UserChat;
