import axios from "axios";

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

export const loginUser = async (username, password) => {
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

export const fetchChatMessages = async (chatPartner) => {
  const response = await api.get(`messages/${chatPartner.userId}`);

  return response.data;
};

export const saveNewPrivateMessage = async (receiverId, content) => {
  const user_id = sessionStorage.getItem("userId");
  const response = await api.post(`messages/new`, {
    senderId: user_id,
    receiverId: receiverId,
    type: "TEXT",
    content: content,
    timestamp: new Date().toISOString(),
  });

  return response.data;
};

export default api;
