import React from "react";

const ChatContext = React.createContext("chat");

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = React.useState([]);
  const [chatPartner, setChatPartner] = React.useState(null);
  let ws_client;

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        setChatMessages,
        chatPartner,
        setChatPartner,
        ws_client,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
