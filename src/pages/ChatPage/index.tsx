import React from "react";
import { AppLayout } from "../../layout/AppLayout";
import Menu from "../../components/chat/Menu";
import ChatRoom from "../../components/chat/chatroom/ChatRoom";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SidePanel from "../../components/chat/sidepanel/SidePanel";

function ChatPage() {
  const navigate = useNavigate();
  const { partnerId } = useParams<{ partnerId?: string }>();
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;

  const handleBack = () => navigate("/");

  return (
    <AppLayout>
      <div className="chatpage flex h-full">
        <Menu className={isMobile && partnerId ? "hidden" : "block"} />
        <SidePanel className={isMobile && partnerId ? "hidden" : "flex-1"} />
        <ChatRoom
          className={isMobile && partnerId ? "flex" : "hidden"}
          onBack={handleBack}
        />
      </div>
    </AppLayout>
  );
}

export default ChatPage;
