import React, { useState } from "react";
import { SiLivechat } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import { InputField } from "../../components/Auth/InputField";
import { SocialLogin } from "../../components/Auth/SocialLogin";
import { AppLayout } from "../../layout/AppLayout";
import { useAuthContext } from "../../context/AuthContext";
import { Divider } from "../../components/common/Divider";

type FromType = "login" | "register";
const MemoizedSocialLogin = React.memo(SocialLogin);

const Auth: React.FC = () => {
  const [formType, setFormType] = useState<FromType>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const { login, register } = useAuth();
  const { isLoading } = useAuthContext();

  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response =
        formType === "login"
          ? await login(email, password)
          : await register(email, password, fullName);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <AppLayout>
      <div className="auth-page flex h-full w-screen justify-center">
        <div className="main-container flex flex-col sm:px-4 px-5 items-center bg-[var(--secondary-color)] h-full w-full max-w-[500px] gap-4 py-10 md:!py-[100px]">
          <div className="flex flex-col justify-center items-center gap-3">
            <SiLivechat size={48} color={"var(--accent-color)"} />
            <div className="text-[2.25rem] text-center">
              {formType === "login"
                ? "Sign in to your account"
                : "Get started with your free account"}
            </div>
            <div className="flex gap-2">
              <span>
                {formType === "login"
                  ? "New User?"
                  : "Already have an Account?"}
              </span>
              <a
                href="#"
                onClick={toggleFormType}
                className="font-medium !no-underline !text-blue-500 hover:underline"
              >
                {formType === "login" ? "Create an account" : "Sign In"}
              </a>
            </div>
          </div>
          <form className="auth-form flex flex-col gap-3 w-full">
            {formType === "register" && (
              <InputField
                type="text"
                placeHolder="Fullname"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            )}
            <InputField
              type="email"
              placeHolder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputField
              type="password"
              placeHolder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              type="submit"
              className="flex justify-center rounded-xl items-center gap-4 bg-[var(--accent-color)] text-white font-semibold p-4 mt-3"
              onClick={handleAuth}
            >
              {isLoading && (
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-4 border-white opacity-30"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-white border-transparent animate-spin"></div>
                </div>
              )}
              {formType === "register" ? "Sign Up" : "Sign In"}
            </div>
          </form>
          {formType === "login" && (
            <>
              <Divider
                type="horizontal"
                withContent="OR"
                bgColor="var(--secondary-color)"
              />
              <div className="flex flex-col gap-3 w-full">
                <MemoizedSocialLogin provider="Google" />
                {/* <MemoizedSocialLogin provider="Github" />
                <MemoizedSocialLogin provider="Apple" /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Auth;
