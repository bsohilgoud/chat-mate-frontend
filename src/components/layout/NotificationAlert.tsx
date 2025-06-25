import React, { useEffect, useState } from "react";
import { TbMessageCirclePlus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

import { FaUserCheck } from "react-icons/fa6";
import { useNotificationContext } from "../../context/NotificationContext";

const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
    const timer = setTimeout(() => {
      handleRemove();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return (
          <TbMessageCirclePlus className="w-12 h-12 text-[var(--accent-color)]" />
        );
      case "online":
        return <FaUserCheck className="w-12 h-12 text-green-500" />;
      default:
        return (
          <TbMessageCirclePlus className="w-4 h-4 text-[var(--accent-color)]" />
        );
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
        backdrop-blur-lg text-[var(--text-primary)]
        rounded-xl shadow-xl hover:shadow-2xl
        p-3 mb-2 min-w-120 max-w-200
        hover:scale-[1.02] transition-transform
        bg-[var(--tertiary-color)]
        border-1 border-[var(--accent-color)]
      `}
      style={{
        boxShadow:
          "0 8px 32px rgba(106,64,255, 0.1), 0 0 0 1px rgba(106,64,255, 0.1)",
      }}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-2 mb-1">{getIcon()}</div>

        <div className="content flex flex-col">
          <span className="text-[1.5rem] font-semibold mb-1">
            {notification.displayName}
          </span>

          <span className="text-[1.25rem] text-[var(--text-primary)] break-words">
            {notification.message}
          </span>
        </div>

        <IoMdClose
          onClick={handleRemove}
          className="fixed top-3 right-3 w-6 h-6 text-white"
        />
      </div>

      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-shrink"
          style={{
            animation: "shrink 5s linear forwards",
          }}
        />
      </div>
    </div>
  );
};

export const NotificationAlert = () => {
  const { notifications, addNotification, removeNotification } =
    useNotificationContext();

  return (
    <div>
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-h-screen overflow-y-auto">
        <div className="flex flex-col items-center">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-shrink {
          animation: shrink 5s linear forwards;
        }
      `}</style>
    </div>
  );
};
