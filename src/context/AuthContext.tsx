import React, { useCallback, useMemo } from "react";
import { UserType } from "../types/authTypes";
import { getCurrentUserAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useMediaStore } from "../hooks/useMediaStore";

type AuthContextType = {
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;

  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;

  newAccountCreated: boolean;
  setNewAccountCreated: React.Dispatch<React.SetStateAction<boolean>>;

  navigate: ReturnType<typeof useNavigate>;
  resetAuthContext: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserType>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [newAccountCreated, setNewAccountCreated] = React.useState(false);
  const navigate = useNavigate();
  const { clearProfileImageBlobs } = useMediaStore();

  const resetAuthContext = useCallback(() => {
    setUser(undefined);
    setIsLoading(false);
    setError(null);
    setToken(null);
    setIsAuthenticated(false);
    setNewAccountCreated(false);
  }, []);

  const value = useMemo(
    () => ({
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
      resetAuthContext,
    }),
    [
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
      resetAuthContext,
    ],
  );

  React.useEffect(() => {
    // console.log("AuthProvider useEffect triggered -> checking if this is getting called for page refresh");
    setIsLoading(true);
    clearProfileImageBlobs();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false);
      logout();
    }

    return () => {};
  }, []);

  const fetchCurrentUser = async (token: string) => {
    try {
      const api_response = await getCurrentUserAPI();
      setUser(api_response.payload);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Invalid token, logging out...");
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
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
