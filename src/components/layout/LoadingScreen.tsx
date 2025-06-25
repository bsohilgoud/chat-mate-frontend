import React from "react";
import { useAuthContext } from "../../context/AuthContext";

export const LoadingScreen = () => {
  const { isLoading } = useAuthContext();

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center bg-[var(--primary-color)] fixed z-1000 ${isLoading ? "" : "hidden"}`}
    >
      <style>
        {`
          .blob-loader {
            width: 120px;
            height: 120px;
            background: var(--accent-color);
            border-radius: 50%;
            position: relative;
            animation: morphBlob 3s infinite ease-in-out;
          }

          .blob-loader::before,
          .blob-loader::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(124, 90, 255, 0.3);
            border-radius: 50%;
            animation: blobPulse 2s infinite ease-in-out;
          }

          .blob-loader::after {
            animation-delay: 1s;
          }

          @keyframes morphBlob {
            0%, 100% {
              border-radius: 50%;
              transform: scale(1) rotate(0deg);
            }
            25% {
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
              transform: scale(1.1) rotate(90deg);
            }
            50% {
              border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
              transform: scale(0.9) rotate(180deg);
            }
            75% {
              border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
              transform: scale(1.05) rotate(270deg);
            }
          }

          @keyframes blobPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.5;
            }
          }
        `}
      </style>

      {/* <div className="text-[2rem] font-semibold text-[var(--accent-color)] mb-10">
        ChatMate
      </div> */}

      <div className="blob-loader" />

      <div className="text-[2rem] text-[var(--accent-color)] mt-[20px] animate-pulse">
        Loading...
      </div>
    </div>
  );
};
