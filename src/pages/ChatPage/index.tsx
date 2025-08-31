import React, { useEffect, useState } from "react";
import { AppLayout } from "../../layout/AppLayout";
import Menu from "../../components/chat/Menu";
import ChatRoom from "../../components/chat/chatroom/ChatRoom";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SidePanel from "../../components/chat/sidepanel/SidePanel";
import WelcomeOnboardingModal from "../../components/common/WelcomeOnboardingModal";
import { useAuthContext } from "../../context/AuthContext";

function ChatPage() {
  const { partnerId } = useParams<{ partnerId?: string }>();
  const { user, newAccountCreated } = useAuthContext();
  const [showWelcome, setShowWelcome] = useState(newAccountCreated);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = !isDesktop;

  return (
    <AppLayout>
      <div className="chatpage flex h-full overflow-hidden">
        {showWelcome && (
          <WelcomeOnboardingModal
            userName={user?.fullName}
            onClose={() => setShowWelcome(false)}
          />
        )}
        <Menu className={isMobile && partnerId ? "hidden" : "block"} />
        <SidePanel className={isMobile && partnerId ? "hidden" : "flex-1"} />
        <ChatRoom className={isMobile && partnerId ? "flex" : "hidden"} />
      </div>
    </AppLayout>
  );
}

export default ChatPage;
