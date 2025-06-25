export interface UserType {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
  onlineStatus: "ONLINE" | "OFFLINE";
  lastSeen: string;
}
