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
  padding: 1.5rem;
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
  background-color: var(--border-color);
  color: var(--button-secondary-text);
  border-radius: 5px;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #1e1b4b 0%, #7c5aff 50%, #c7d2fe 100%);
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
