export interface conversationSummary {
  contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
  content: string;
  timestamp: string;
  receiverId: string;
  senderId: string;
  status: MessageStatusType;
  newMessagesCount: number;
  partnerProfileUrl: string;
  partnerFullName: string;
  partnerId: string;
  partnerOnlineStatus: "ONLINE" | "OFFLINE";
  partnerLastSeen: string;
  isTyping: false | true;
}

export interface chatMessage {
  messageId?: number | null;
  senderId: string;
  receiverId: string;
  content: string;
  type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
  mediaFileDTO?: {
    id: number;
    url: string;
    name: string;
    size: number;
    type: string;
  };
  status: MessageStatusType;
  timestamp: string;
  replyToMessageId?: number;
}

export type MessageStatusType = "PENDING" | "DELIVERED" | "READ" | "DELETED";
