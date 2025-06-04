import React from "react";
import { useEffect } from "react";
import { AppLayout } from "../../layout/AppLayout";
import Menu from "../../components/chat/Menu";
import ChatRoom from "../../components/chat/chatroom/ChatRoom";
import { SidePanel } from "../../components/chat/sidepanel/SidePanel";

function ChatPage() {
  useEffect(() => {
    console.log("Connection to WebSocket Server.....");
  }, []);

  return (
    <AppLayout>
      <div className="chatpage flex">
        <Menu />
        <SidePanel />
        <ChatRoom />
      </div>
    </AppLayout>
  );
}

export default ChatPage;
