import React from "react";
import { InputField } from "./InputField";

type RegistrationFormProps = {
  handleAuth: (action: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFullName: (password: string) => void;
};

export const RegistrationForm = ({
  handleAuth,
  setEmail,
  setPassword,
  setFullName,
}: RegistrationFormProps) => {
  return (
    <form className="auth-form">
      <InputField
        type="text"
        placeHolder="Your nickname"
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />
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
        {"Sign Up"}
      </button>
    </form>
  );
};
