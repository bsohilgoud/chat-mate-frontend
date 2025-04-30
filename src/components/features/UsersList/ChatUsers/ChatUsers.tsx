import "./ChatUsers.scss";
import ChatUserCard from "../ChatUserCard/ChatUserCard";
import { useContext } from "react";
import ChatContext from "../../../../context/ChatContext";
import PropTypes from "prop-types";

function ChatUsers({ lastConversations }) {
  const { setChatPartner } = useContext(ChatContext);

  const handleSetChatPartner = (chatPartner) => {
    console.log(`chat partner: ${chatPartner.displayName}`);
    setChatPartner(chatPartner);
  };

  ChatUsers.propTypes = {
    lastConversations: PropTypes.array.isRequired,
  };

  return (
    <div className="chat-users">
      <div className="chat-users-header">{"Chat"}</div>
      <div className="users-list">
        {lastConversations.map((conversation) => (
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
