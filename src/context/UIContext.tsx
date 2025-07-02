import React, { useCallback, useMemo, useState } from "react";
import { menuType, themeType } from "../types/uiTypes";

type alertType = "error" | "warn" | "info";

type UIContextType = {
  selectedMenu: menuType;
  setSelectedMenu: React.Dispatch<React.SetStateAction<menuType>>;

  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;

  notificationMessage: string;
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>;

  notificationType: NotificationType;
  setNotificationType: React.Dispatch<React.SetStateAction<NotificationType>>;

  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;

  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;

  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;

  alertType: alertType;
  setAlertType: React.Dispatch<React.SetStateAction<alertType>>;

  theme: themeType | undefined;
  setTheme: React.Dispatch<React.SetStateAction<themeType | undefined>>;

  showChatRoom: boolean;
  setShowChatRoom: React.Dispatch<React.SetStateAction<boolean>>;

  showLoadingScreen: boolean;
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  resetUIContext: () => void;
};

const UIContext = React.createContext<UIContextType | undefined>(undefined);

type NotificationType = "info" | "error" | "success";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState<menuType>("chats");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("info");
  const [currentPage, setCurrentPage] = useState("chat");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [theme, setTheme] = useState<themeType>(
    localStorage.getItem("theme") || "light",
  );
  const [showChatRoom, setShowChatRoom] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);

  const resetUIContext = useCallback(() => {
    setSelectedMenu("chats");
    setShowNotification(false);
    setNotificationMessage("");
    setNotificationType("info");
    setCurrentPage("chat");
    setShowAlert(false);
    setAlertMessage("");
    setAlertType("");
    setTheme(localStorage.getItem("theme") || "light");
    setShowChatRoom(false);
    setShowLoadingScreen(false);
  }, []);

  const value = useMemo(
    () => ({
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
      showChatRoom,
      setShowChatRoom,
      showLoadingScreen,
      setShowLoadingScreen,
      resetUIContext, // ✅ Add this line
    }),
    [
      selectedMenu,
      showNotification,
      notificationMessage,
      notificationType,
      currentPage,
      showAlert,
      alertMessage,
      alertType,
      theme,
      showChatRoom,
      showLoadingScreen,
      resetUIContext,
    ],
  );

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
