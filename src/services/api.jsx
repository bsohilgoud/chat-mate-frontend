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
  const response = await api.get("/users/all", {
    withCredentials: true,
  });
  return response.data; // Return data directly
};

export const fetchChatMessages = async (chatPartner) => {
  const response = await api.get(`messages/${chatPartner.userId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default api;
