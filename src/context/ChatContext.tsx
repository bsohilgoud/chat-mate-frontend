import React, { ReactNode } from "react";

export type ChatMessageType = {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: string;
  status: string;
  timestamp: Date;
};

export type LastConversationType = {
  senderId: string;
  receiverId: string;
  content: string;
  newMessagesCount: number;
  status: string;
  timestamp: Date;
  partnerId: string;
  partnerDisplayName: string;
};

export type ChatPartner = {
  userId: string;
  displayName: string;
};

export type ChatProviderProps = {
  children: ReactNode;
};

type ChatContextType = {
  chatMessages: ChatMessageType[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  chatPartner: ChatPartner | null;
  setChatPartner: React.Dispatch<React.SetStateAction<ChatPartner | null>>;
  lastConversations: LastConversationType[];
  setLastConversations: React.Dispatch<
    React.SetStateAction<LastConversationType[]>
  >;
  ws_client: WebSocket | null;
};

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatMessages, setChatMessages] = React.useState<ChatMessageType[]>([]);
  const [chatPartner, setChatPartner] = React.useState<ChatPartner | null>(
    null,
  );
  const [lastConversations, setLastConversations] = React.useState<
    LastConversationType[]
  >([]);

  // Initialize WebSocket client
  const ws_client = null; // Replace with your actual WebSocket implementation

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        setChatMessages,
        chatPartner,
        setChatPartner,
        lastConversations,
        setLastConversations,
        ws_client,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Helper hook for consuming context
export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
