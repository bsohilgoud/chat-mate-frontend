import React, { useState } from "react";
import { menuType, themeType } from "../types/uiTypes";

const UIContext = React.createContext(null);

type NotificationType = "info" | "error" | "success";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState<menuType>("chats");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("info"); // info, error, success
  const [currentPage, setCurrentPage] = useState("chat");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [theme, setTheme] = useState<themeType>();

  const value = {
    selectedMenu,
    setSelectedMenu,
    showNotification,
    setShowNotification,
    notificationMessage,
    setNotificationMessage,
    notificationType,
    setNotificationType,
    currentPage,
    setCurrentPage,
    showAlert,
    setShowAlert,
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    theme,
    setTheme,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;

export const useUIContext = () => {
  const context = React.useContext(UIContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an UIProvider");
  }
  return context;
};
