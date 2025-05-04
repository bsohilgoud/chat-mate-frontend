import axios from "axios";
import type { ChatPartner } from "../context/ChatContext";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     console.error("API error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   },
// );

export const loginUser = async (username: string, password: string) => {
  const response = await api.post(
    "/auth/login",
    { username, password }, // for post() we need to send the body as second param
    {
      withCredentials: true, // Instead of credentials: "include" (fetch)
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

//TIP: No body for the get() request
export const fetchUsers = async () => {
  const response = await api.get("/users/all");
  return response.data; // Return data directly
};

export const fetchLastConversations = async () => {
  const response = await api.get("/messages/latest");
  return response.data; // Return data directly
};

export const fetchChatMessages = async (chatPartner: ChatPartner) => {
  const response = await api.get(`messages/${chatPartner.userId}`);

  return response.data;
};

export const sendNewChatMessage = async (
  receiverId: string,
  content: string,
) => {
  const user_id = sessionStorage.getItem("userId");
  const message = {
    senderId: user_id,
    receiverId: receiverId,
    type: "TEXT",
    content: content,
    timestamp: new Date().toISOString(),
  };
  console.log("Sending message:", message);
  const response = await api.post(`messages/new`, message);

  return response.data;
};

export const updateMessageStatus = async (
  messageId: string,
  status: string,
) => {
  const response = await api.patch(`messages/status/${messageId}`, {
    status: status,
  });

  return response.data;
};

export const updateBulkMessageStatus = async (
  partnerId: string,
  fromStatus: string,
  toStatus: string,
) => {
  const request_body = {
    partnerId: partnerId,
    fromStatus: fromStatus,
    toStatus: toStatus,
  };
  console.log("Updating bulk message status:", request_body);
  const response = await api.post(`messages/status/bulk`, request_body);

  return response.data;
};

export default api;
