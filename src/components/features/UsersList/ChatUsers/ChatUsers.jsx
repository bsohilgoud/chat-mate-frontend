import "./ChatUsers.scss";
import ChatUserCard from "../ChatUserCard/ChatUserCard";
import { useContext } from "react";
import ChatContext from "../../../../context/ChatContext";
import PropTypes from "prop-types";

function ChatUsers({ usersList }) {
  const { setChatPartner } = useContext(ChatContext);

  const handleSetChatPartner = (user) => {
    console.log(`chat partner: ${user.userId}`);
    setChatPartner(user);
  };

  ChatUsers.propTypes = {
    usersList: PropTypes.array.isRequired,
  };

  return (
    <div className="chat-users">
      <div className="chat-users-header">{"Chat"}</div>
      <div className="users-list">
        {usersList.map((user) => (
          <ChatUserCard
            key={user.userId}
            userDetails={user}
            onPress={() => handleSetChatPartner(user)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatUsers;
