import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api";
import { SiLivechat } from "react-icons/si";
import { InputField } from "./InputField";
import { SocialLogin } from "./SocialLogin";

type FromType = "login" | "register";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState<FromType>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  const login = async () => {
    const response = await loginUser(email, password);
    return response;
  };

  const register = async () => {
    const response = await registerUser(email, password, nickName);
    return response;
  };

  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = formType === "login" ? await login() : await register();
      const responseJson = response.data;

      /* Here since we are using browser, we dont need to get the cookie, it will be passed automatically :)
          1. In the initial login request -> the Cookie -> wiil be stored in the Application storage (JSESSIONID, e4245n...)
          2. For every other requests it will share on include these cookies --- Yay!!! Cool
          3. else we have to get the cookie from the headers and manually set it for each request (response.headers.get("set-cookie"))
        */
      if (response.status == 200) {
        /* Try to use Context, Redux (standard) approach to share the userId state across the components */
        sessionStorage.setItem("userId", responseJson.userId);
        navigate("/chat");
      } else {
        console.error("Login failed:", responseJson);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <>
      <div className="auth-page">
        <div className="main-container">
          <div className="header">
            <div className="icon-chat-mate">
              <SiLivechat size={48} />
            </div>
            {formType === "login" ? (
              <>
                <h2>Welcome Back</h2>
                <div>Sign in to your account</div>
              </>
            ) : (
              <>
                <h2>Create Account</h2>
                <div>Get started with your free account</div>
              </>
            )}
          </div>
          <div className="error-msg"></div>
          <form className="auth-form">
            {formType === "register" && (
              <InputField
                type="text"
                placeHolder="Your nickname"
                onChange={(e) => {
                  setNickName(e.target.value);
                }}
              />
            )}
            <InputField
              type="email"
              placeHolder="Your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputField
              type="password"
              placeHolder="Your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit" className="login-btn" onClick={handleAuth}>
              {formType === "register" ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <div className="divider-container">
            <div className="hr-line"></div>
            <span className="or-text">OR</span>
            <div className="hr-line"></div>
          </div>
          <div className="social-login-container">
            <SocialLogin provider="Google" />
            <SocialLogin provider="Github" />
            <SocialLogin provider="Apple" />
          </div>
          <div className="footer">
            {formType === "login" ? (
              <>
                <span>Don`t have an Account?</span>
                <a href="#" onClick={toggleFormType}>
                  Create One
                </a>
              </>
            ) : (
              <>
                <span>Already have an Account?</span>
                <a href="#" onClick={toggleFormType}>
                  Sign In
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
