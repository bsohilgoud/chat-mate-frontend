export interface conversationSummary {
  contentType: string;
  content: string;
  timestamp: string;
  receiverId: string;
  senderId: string;
  partnerProfileUrl: string;
  newMessagesCount: 0;
  partnerFullName: string;
  partnerId: string;
}

export interface chatMessage {
  messageId: number;
  senderId: string;
  receiverId: string;
  content: string;
  type: "TEXT";
  mediaFileDTO: {
    id: number;
    url: string;
    name: string;
    size: number;
    type: string;
  };
  status: "PENDING";
  timestamp: string;
}
