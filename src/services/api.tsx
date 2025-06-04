import axios from "axios";
import type { ChatPartner } from "../context/ChatContext";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const registerAPI = async (
  username: string,
  password: string,
  fullName: string,
) => {
  const response = await api.post(
    "/auth/login",
    { username, password, fullName }, // for post() we need to send the body as second param
    {
      withCredentials: true, // Instead of credentials: "include" (fetch)
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const apiResponse = response.data;
  if (apiResponse.status == 201)
    localStorage.setItem("token", apiResponse.payload.token);
  return apiResponse;
};

export const loginAPI = async (username: string, password: string) => {
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
  const apiResponse = response.data;
  if (apiResponse.status == 200)
    localStorage.setItem("token", apiResponse.payload.token);

  return apiResponse;
};

export const googleOauthLogin = async (credential: string) => {
  const response = await api.post(
    "/auth/oauth/google",
    { googleToken: credential },
    {
      withCredentials: true,
    },
  );
  return response;
};

export const googleSignInWithAuthCode = async (code: string) => {
  console.log("Making googleSignInWithAuthCode request");
  const response = await api.post(
    "/auth/google",
    { authCode: code },
    {
      withCredentials: true,
    },
  );
  return response;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout", {
    withCredentials: true, // Instead of credentials: "include" (fetch)
  });
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

export const sendNewChatMessage = async (message) => {
  console.log("Sending message:", message);
  const response = await api.post(`/messages/new`, message);

  return response.data;
};

export const updateMessageStatus = async (
  messageId: string,
  status: string,
) => {
  const response = await api.post(`/messages/status/${messageId}`, {
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

export const getMediaFile = async (fileName: string) => {
  const response = await api.get(`messages/media/${fileName}`, {
    responseType: "blob",
  });
  return response.data;
};

export default api;

/* ============================================================================================
    *****************************        Users API's   **********************************
=============================================================================================== */

export const getCurrentUserAPI = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const getPartnerDetailsAPI = async (partnerId: string) => {
  const response = await api.get(`/users/${partnerId}`);
  console.log(response.data);
  return response.data;
};

export const getUsersAPI = async () => {
  const response = await api.get("/users/");
  console.log(response.data);
  return response.data;
};

/* ============================================================================================
    *****************************          Messages API's   **********************************
=============================================================================================== */

export const getMessagesSummaryAPI = async () => {
  const response = await api.get("/messages/conversations/summary");
  return response.data;
};

export const getChatMessagesAPI = async (chatPartnerId: string) => {
  const response = await api.get(`/messages/conversations/${chatPartnerId}`);
  return response.data;
};
