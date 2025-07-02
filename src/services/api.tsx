import axios from "axios";
import { chatMessage, MessageStatusType } from "../types/chatTypes";
import { WSNotificationType } from "../context/NotificationContext";

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
    const token = localStorage.getItem("token");

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
    { username, password },
    {
      withCredentials: true,
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
  const apiResponse = response.data;
  if (apiResponse.status == 200)
    localStorage.setItem("token", apiResponse.payload.token);
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout", {
    withCredentials: true, // Instead of credentials: "include" (fetch)
  });
  return response;
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
  return response.data;
};

export const getUsersAPI = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const getProfileImageAPI = async (userId: string) => {
  const response = await api.get(`/users/profile/${userId}`, {
    responseType: "blob",
  });
  if (response.status == 200) {
    const blob = new Blob([response.data]);
    return URL.createObjectURL(blob);
  }
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

export const postMessageAPI = async (message: chatMessage) => {
  const response = await api.post(`/messages`, message);
  return response.data;
};

export const updateMessageStatusAPI = async (
  messageId: number,
  status: MessageStatusType,
) => {
  const response = await api.patch(`messages/status/${messageId}`, {
    status: status,
  });

  return response.data;
};

export const batchMessageStatusUpdateAPI = async (
  partnerId: string,
  fromStatus: MessageStatusType,
  toStatus: MessageStatusType,
) => {
  const request_body = {
    partnerId: partnerId,
    fromStatus: fromStatus,
    toStatus: toStatus,
  };
  const response = await api.post(`messages/status/batch`, request_body);

  return response.data;
};

export const getMediaFileAPI = async (mediaFileName: string) => {
  const response = await api.get(`messages/media/${mediaFileName}`, {
    responseType: "blob",
  });
  return response.data;
};

/* ============================================================================================
    *****************************          Notifications API's   **********************************
=============================================================================================== */

export const sendNotificationAPI = (
  toUser: string,
  fromUser: string,
  type: WSNotificationType,
) => {
  api.post("/notification", { toUser, fromUser, type });
};
