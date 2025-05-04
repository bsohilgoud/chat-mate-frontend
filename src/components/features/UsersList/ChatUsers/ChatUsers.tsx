import React, { useEffect } from "react";
import "./ChatUsers.scss";
import ChatUserCard from "../ChatUserCard/ChatUserCard";
import { useContext } from "react";
import ChatContext from "../../../../context/ChatContext";
import type {
  ChatPartner,
  LastConversationType,
} from "../../../../context/ChatContext";
import {
  fetchLastConversations,
  updateBulkMessageStatus,
} from "../../../../services/api";

function ChatUsers() {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("ChatContext is not provided");
  }
  const { setChatPartner, lastConversations, setLastConversations } =
    chatContext;
  const handleSetChatPartner = (chatPartner: ChatPartner) => {
    console.log(`chat partner: ${chatPartner.displayName}`);
    setChatPartner(chatPartner);

    // Update all unread messages status to read
    updateBulkMessageStatus(chatPartner.userId, "DELIVERED", "READ");
    lastConversations.forEach((conversation: LastConversationType) => {
      if (conversation.partnerId === chatPartner.userId) {
        conversation.newMessagesCount = 0;
      }
    });
    setLastConversations([...lastConversations]);
  };

  useEffect(() => {
    const fetchUsersList = async () => {
      const lastMessages = await fetchLastConversations();
      setLastConversations(lastMessages);
      console.log(`lastConversations : ${JSON.stringify(lastMessages)}`);
    };

    fetchUsersList();
  }, []);

  if (lastConversations.length === 0)
    return <div className="chat-users">No users found</div>;

  return (
    <div className="chat-users">
      <div className="chat-users-header">{"Chat"}</div>
      <div className="users-list">
        {lastConversations.map((conversation: LastConversationType) => (
          <ChatUserCard
            key={conversation.partnerId}
            conversation={conversation}
            handleSetChatPartner={() =>
              handleSetChatPartner({
                userId: conversation.partnerId,
                displayName: conversation.partnerDisplayName,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ChatUsers;
