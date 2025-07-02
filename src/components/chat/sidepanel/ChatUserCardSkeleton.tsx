import { memo } from "react";
import React from "react";

const ChatUserCardSkeleton = memo(() => {
  return (
    <div className="flex items-center px-2 rounded-md animate-pulse">
      <div className="w-18 h-18 bg-[var(--border-color)] rounded-full flex-shrink-0"></div>

      <div className="conversation-container flex flex-col py-4 flex-1 ml-5 min-w-0 gap-3 border-b-[0.5px] border-b-[var(--border-color)]">
        <div className="name-date-container flex items-center justify-between mb-1">
          <div className="h-6 bg-[var(--border-color)] rounded w-32"></div>
        </div>
        <div className="message-container flex items-center justify-between">
          <div className="message flex items-center min-w-0 w-full">
            <div className="h-5 bg-[var(--border-color)] rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

ChatUserCardSkeleton.displayName = "ChatUserCardSkeleton";

export default ChatUserCardSkeleton;
