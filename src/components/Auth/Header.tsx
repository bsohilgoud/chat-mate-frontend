import { SiLivechat } from "react-icons/si";
import React from "react";

export const Header = ({ formType }: { formType: string }) => {
  return (
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
  );
};
