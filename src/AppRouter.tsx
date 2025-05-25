import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import { ChatProvider } from "./context/ChatContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./components/Auth/Auth";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="/login" element={<Auth />} />
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
  );
};

export default AppRouter;
