import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import { useChatContext } from "../../../context/ChatContext";
import { SiLivechat } from "react-icons/si";
import ChatConversation from "./ChatConversation";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import { useChat } from "../../../hooks/useChat";

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

  useEffect(() => {
    if (partnerId != null) {
      setChatPartnerId(partnerId);
      fetchPartnerDetails(partnerId);
    } else {
      setChatPartnerId(undefined);
    }
  }, [partnerId]);

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
      className={`${className} md:flex user-chat flex-col h-full flex-1 overflow-hidden`}
    >
      <ChatHeader />
      <ChatConversation />
      <ChatBox />
    </div>
  );
}

export default ChatRoom;
