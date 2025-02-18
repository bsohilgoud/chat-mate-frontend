import React from 'react'
import './ChatUsers.scss'
import ChatUserCard from '../ChatUserCard/ChatUserCard';

function ChatUsers({ userslist }) {
  const numberOfUsers = 30; // You can make this a variable

  return (
    <div className="chat-users">
      <div className="search-user">{"Search User"}</div>
      <div className="users-list">
        {Array.from({ length: numberOfUsers }).map((_, index) => (
          <ChatUserCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default ChatUsers
