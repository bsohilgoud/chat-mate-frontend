import React from 'react'
import './ChatUserCard.scss'
const ChatUserCard = ({userMap}) => {
  return (
    <div className="chat-user-card">
      <div className="name-date-container">
        <div className="name">{userMap.displayName}</div>
        <div className="date"> {"12/11/2025"}</div>
      </div>
      <div className="message-container">
        <div className="message">{"Hi How are you??"}</div>
        <div className="unread-count">{2}</div>
      </div>
    </div>
  );
}

export default ChatUserCard
