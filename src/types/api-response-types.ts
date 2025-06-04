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

export interface UserType {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
}
