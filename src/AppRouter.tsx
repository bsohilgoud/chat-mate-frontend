import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ChatPage from "./pages/ChatPage/ChatPage";
import { ChatProvider } from "./context/ChatContext";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
