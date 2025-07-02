import React from "react";

export const TypingIndicator = () => {
  return (
    <>
      <style jsx>{`
        @keyframes typing {
          0%,
          60%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }

        .typing-dot {
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      <div className="flex items-center gap-1 px-2 py-3 rounded-full">
        <div className="typing-dot w-3 h-3 bg-[#7c5aff] rounded-full"></div>
        <div className="typing-dot w-3 h-3 bg-[#7c5aff] rounded-full"></div>
        <div className="typing-dot w-3 h-3 bg-[#7c5aff] rounded-full"></div>
      </div>
    </>
  );
};
