import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import AuthProvider from "./context/AuthContext";
import UIProvider from "./context/UIContext";
import { ChatProvider } from "./context/ChatContext";
import { NotificationProvider } from "./context/NotificationContext";
import { MediaPreviewProvider } from "./context/MediaPreviewContext";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <UIProvider>
        <AuthProvider>
          <ChatProvider>
            <NotificationProvider>
              <MediaPreviewProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/chats" />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/chats/:partnerId?" element={<ChatPage />} />
                  <Route path="/contacts/" element={<ChatPage />} />
                  <Route path="/settings/" element={<ChatPage />} />
                  <Route path="/profile/" element={<ChatPage />} />
                </Routes>
              </MediaPreviewProvider>
            </NotificationProvider>
          </ChatProvider>
        </AuthProvider>
      </UIProvider>
    </Router>
  );
};

export default AppRouter;
