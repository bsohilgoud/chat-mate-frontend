import React from "react";
import { UserType } from "../types/authTypes";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserType>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [newAccountCreated, setNewAccountCreated] = React.useState(false);

  const value = {
    user,
    setUser,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    error,
    setError,
    newAccountCreated,
    setNewAccountCreated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
