import React from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

interface WelcomeOnboardingModalProps {
  onClose: () => void;
  userName: string;
}

const WelcomeOnboardingModal: React.FC<WelcomeOnboardingModalProps> = ({
  onClose,
  userName,
}) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4">
      <Confetti
        width={screenWidth}
        height={screenHeight}
        numberOfPieces={400}
        recycle={false}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-12 text-center overflow-hidden bg-[var(--secondary-color)] text-[var(--text-primary)]"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl mb-4"
        >
          🎊🎉
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--accent-color)]">
          Welcome to ChatMate, {userName}! 🚀
        </h2>

        <p className="text-[1.25rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
          We're excited to have you join our chat community. Start exploring,
          connect with friends, and enjoy your chats!
        </p>

        <div
          onClick={onClose}
          className="px-8 py-3 text-[1.5rem] bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)] text-white rounded-full transition duration-300"
        >
          Let’s Start Chatting 💬
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeOnboardingModal;
