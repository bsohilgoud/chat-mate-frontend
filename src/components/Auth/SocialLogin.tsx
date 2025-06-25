import React from "react";
import { styled } from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import {
  CodeResponse,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { googleSignInWithAuthCode } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const SocialLoginBtn = styled.button`
  padding: 1rem;
  border-radius: 1rem;
  border: 0.5px solid var(--accent-color);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background: var(--primary-color);
  color: var(--accent-color);
  font-size: 1.5rem;
  font-weight: 400;
  background-color: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border-radius: var(--border-radius-md);
  border: none;

  &:hover {
    background: var(--accent-color-hover);
    color: white;
  }

  > svg {
    color: var(--text-primary);
  }

  &:hover > svg {
    color: white;
  }
`;

type SocialLoginProps = {
  provider: "Google" | "Github" | "Apple";
};

export const SocialLogin = ({ provider }: SocialLoginProps) => {
  const navigate = useNavigate();
  const { oauthLogin } = useAuth();

  const failureSignIn = (
    error: Pick<CodeResponse, "error" | "error_description" | "error_uri">,
  ) => {
    console.log(error.error_description);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse: CodeResponse) => {
      oauthLogin("GOOGLE", codeResponse.code);
      navigate("/chat");
    },
    onError(errorResponse) {
      failureSignIn(errorResponse);
    },
    flow: "auth-code",
  });

  const providerIcons = {
    Google: <FcGoogle size={24} />,
    Github: <FaGithub size={24} />,
    Apple: <FaApple size={24} />,
  };

  const loginHandlers: Record<string, () => void> = {
    Google: googleLogin,
  };

  return (
    <SocialLoginBtn onClick={loginHandlers[provider]}>
      {providerIcons[provider]}
      <span> {`SignIn with ${provider}`} </span>
    </SocialLoginBtn>
  );
};
