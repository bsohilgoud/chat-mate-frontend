import { useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getCurrentUserAPI,
  googleSignInWithAuthCode,
  loginAPI,
  registerAPI,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUI } from "./useUI";

export const useAuth = () => {
  const {
    setUser,
    setToken,
    setIsLoading,
    setIsAuthenticated,
    setNewAccountCreated,
  } = useAuthContext();

  const navigate = useNavigate();
  const { showAlert } = useUI();

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      /* Here since we are using browser, we dont need to get the cookie, it will be passed automatically :)
          1. In the initial login request -> the Cookie -> wiil be stored in the Application storage (JSESSIONID, e4245n...)
          2. For every other requests it will share on include these cookies --- Yay!!! Cool
          3. else we have to get the cookie from the headers and manually set it for each request (response.headers.get("set-cookie"))
        */
      const response = await loginAPI(username, password);
      successfulLogin(response);
      return response;
    } catch (error) {
      let errorMessage = "";
      switch (error.status) {
        case 403:
          errorMessage = "Invalid username or password!!";
          break;
        case 404:
          errorMessage = "Username not exists!!";
          break;
        case 500:
          errorMessage = "Service Unavailable!!";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      showAlert("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, nickName: string) => {
      setIsLoading(true);
      try {
        const response = await registerAPI(email, password, nickName);
        successfulLogin(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const oauthLogin = useCallback(async (provider: string, authCode: string) => {
    setIsLoading(true);
    try {
      let response;
      switch (provider) {
        case "GOOGLE":
          response = await googleSignInWithAuthCode(authCode);
          break;
      }
      successfulLogin(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const api_response = await getCurrentUserAPI();
      if (api_response.status == 200) {
        const userDTO = api_response.payload;
        console.log("logged in userDTO: " + userDTO);
        setUser(userDTO);
        sessionStorage.setItem("userId", userDTO.id);
        navigate("/chat");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function successfulLogin(response: any) {
    const { token } = response.payload.token;
    setToken(token);
    setIsAuthenticated(true);
    setNewAccountCreated(true);
    fetchCurrentUser();
    showAlert("info", "Successful login");
  }

  return {
    login,
    register,
    oauthLogin,
  };
};
