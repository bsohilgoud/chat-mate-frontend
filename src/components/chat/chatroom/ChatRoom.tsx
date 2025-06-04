import React from "react";
import ChatHeader from "./ChatHeader";
import { useChatContext } from "../../../context/ChatContext";
import { SiLivechat } from "react-icons/si";
import ChatConversation from "./ChatConversation";
import ChatBox from "./ChatBox";
// import ChatBox from "../ChatRoom/ChatBox/ChatBox";
// import ChatConversation from "../ChatRoom/ChatConversation";

function ChatRoom() {
  const bounceKeyframes = `
  @keyframes bounce {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  `;

  const { chatPartnerId }: { chatPartnerId: string } = useChatContext();

  if (chatPartnerId == null) {
    return (
      <div className="flex flex-col h-screen flex-1 p-4 gap-3 justify-center items-center ">
        <style>{bounceKeyframes}</style>
        <div
          className="flex items-center justify-center text-center p-4 rounded-full border-[0.5px] border-dashed border-[var(--accent-color)]"
          style={{
            animation: "bounce 1s ease-in-out infinite",
          }}
        >
          <SiLivechat size={36} color="var(--text-muted)" />
        </div>
        <span className="flex items-center justify-center text-[2.5rem] text-center">
          Welcome to ChatMate!!
          {/* <span className="pl-3 text-[var(--accent-color)]">ChatMate!! </span> */}
        </span>
        <span className="flex items-center justify-center text-[1.5rem] text-center">
          {"Select a conversation from the sidebar to start chatting "}
        </span>
      </div>
    );
  }

  return (
    <div className="user-chat flex flex-col h-screen flex-1">
      <ChatHeader />
      <ChatConversation />
      <ChatBox />
    </div>
  );
}

export default ChatRoom;
