import React from "react";
import { InputField } from "./InputField";

type LoginFormProps = {
  handleAuth: (action: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

export const LoginForm = ({
  handleAuth,
  setEmail,
  setPassword,
}: LoginFormProps) => {
  return (
    <>
      <div className="header">
        <h2>Welcome Back</h2>
        <div>Sign in to your account</div>
      </div>
      <form className="auth-form">
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
          className="login-btn"
          onClick={() => handleAuth("login")}
        >
          {"Sign In"}
        </button>
      </form>
    </>
  );
};
