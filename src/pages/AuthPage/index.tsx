import React, { useState } from "react";
import "./index.css";
import { SiLivechat } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import { InputField } from "../../components/Auth/InputField";
import { SocialLogin } from "../../components/Auth/SocialLogin";
import { AppLayout } from "../../layout/AppLayout";
import { useAuthContext } from "../../context/AuthContext";

type FromType = "login" | "register";

const Auth: React.FC = () => {
  const [formType, setFormType] = useState<FromType>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const { login, register } = useAuth();
  const { isLoading } = useAuthContext();

  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response =
        formType === "login"
          ? await login(email, password)
          : await register(email, password, nickName);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <AppLayout>
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
            <button
              type="submit"
              className="login-btn flex justify-center items-center gap-4"
              onClick={handleAuth}
            >
              {isLoading && (
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-4 border-white opacity-30"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-white border-transparent animate-spin"></div>
                </div>
              )}
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
    </AppLayout>
  );
};

export default Auth;
