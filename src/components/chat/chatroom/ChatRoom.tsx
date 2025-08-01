import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useChatContext } from "../../../context/ChatContext";
import { SiLivechat } from "react-icons/si";
import ChatConversation from "./ChatConversation";
import ChatBox from "./ChatBox";
import { useLocation, useParams } from "react-router-dom";
import { useChat } from "../../../hooks/useChat";
import { ChatPartnerProfile } from "./ChatPartnerProfile";

function ChatRoom({ className }: { className: string }) {
  const bounceKeyframes = `
  @keyframes bounce {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  `;

  const { partnerId } = useParams<{ partnerId?: string }>();
  const { fetchPartnerDetails } = useChat();
  const { setChatPartnerId } = useChatContext();
  const { chatPartner } = useChatContext();
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);

  useEffect(() => {
    if (partnerId != null) {
      setChatPartnerId(partnerId);
      fetchPartnerDetails(partnerId);
    } else {
      setChatPartnerId(undefined);
    }
  }, [partnerId]);

  const location = useLocation();

  // Detect navigation changes and hide profile
  useEffect(() => {
    if (showUserProfile) {
      setShowUserProfile(false); // Hide profile on URL/path change
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (partnerId == null) {
    return (
      <div
        className={`${className} md:flex flex-col h-full flex-1 p-4 gap-3 justify-center items-center overflow-y-none`}
      >
        <style>{bounceKeyframes}</style>
        <div
          className="flex items-center justify-center text-center p-4 rounded-full border-[0.5px] border-dashed border-[var(--accent-color)]"
          style={{
            animation: "bounce 1s ease-in-out infinite",
          }}
        >
          <SiLivechat size={36} color="var(--text-muted)" />
        </div>
        <span
          className="flex items-center justify-center font-bold text-[2.5rem] text-center bg-[linear-gradient(135deg,_#7c5aff_0%,_#3b82f6_100%)]
          bg-clip-text text-transparent"
        >
          Welcome to ChatMate!!
        </span>
        <span className="flex items-center justify-center text-[1.5rem] text-center bg-[linear-gradient(135deg,_#7c5aff_0%,_#f59e0b_100%)] bg-clip-text text-transparent">
          {"Select a conversation from the sidebar to start chatting "}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${className} relative md:flex user-chat flex-col h-full flex-1 overflow-hidden`}
    >
      <ChatHeader
        chatPartner={chatPartner}
        setShowUserProfile={setShowUserProfile}
      />
      <ChatConversation />
      <ChatBox />
      <ChatPartnerProfile
        chatPartner={chatPartner}
        showProfile={showUserProfile}
        setShowUserProfile={setShowUserProfile}
      />
    </div>
  );
}

export default ChatRoom;
