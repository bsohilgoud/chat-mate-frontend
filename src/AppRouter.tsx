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

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route
              path="/chat"
              element={
                <ChatProvider>
                  <ChatPage />
                </ChatProvider>
              }
            />
          </Routes>
        </Router>
      </UIProvider>
    </AuthProvider>
  );
};

export default AppRouter;
