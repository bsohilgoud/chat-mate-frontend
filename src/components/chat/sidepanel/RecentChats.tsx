import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { useChat } from "../../../hooks/useChat";
import { conversationSummary } from "../../../types/chatTypes";
import { Divider } from "../../common/Divider";
import { SearchInput } from "../../common/SearchInput";
import ChatUserCard from "./ChatUserCard";
import { useAuthContext } from "../../../context/AuthContext";
import ChatUserCardSkeleton from "./ChatUserCardSkeleton";
import { MdEmail } from "react-icons/md";
import { useUIContext } from "../../../context/UIContext";

export const RecentChats = ({ onChatSelect }) => {
  const { recentChats, setRecentChats } = useChatContext();
  const { setSelectedMenu } = useUIContext();
  const [filteredChats, setFilteredChats] = useState<conversationSummary[]>([]);
  const { fetchRecentChats } = useChat();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filtered = recentChats.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.partnerId === obj.partnerId),
    );
    filtered.sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp));
    setFilteredChats(filtered);
  }, [recentChats]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase().trim();

      if (query !== "") {
        const filtered = recentChats.filter((recentChat) =>
          recentChat.partnerFullName.toLowerCase().includes(query),
        );
        setFilteredChats(filtered);
      } else {
        const filtered = recentChats.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.partnerId === obj.partnerId),
        );
        filtered.sort((x, y) => new Date(x.timestamp) - new Date(y.timestamp));
        setFilteredChats(filtered);
      }
    },
    [recentChats],
  );

  useEffect(() => {
    if (recentChats.length == 0) {
      setIsLoading(true);
      setTimeout(() => {
        fetchRecentChats().finally(() => {
          setIsLoading(false);
        });
      }, 200);
    }
  }, []);

  const handleOnChatSelect = (partner_id: string) => {
    setRecentChats((recentChats) =>
      recentChats.map((chat) =>
        chat.partnerId === partner_id ? { ...chat, newMessagesCount: 0 } : chat,
      ),
    );
    onChatSelect(partner_id);
  };

  return (
    <div className="h-full max-h-screen flex flex-col overflow-y-none">
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Chat </div>
        <SearchInput onChange={handleSearchChange} />
      </div>
      <Divider type="horizontal" />
      <div className="relative recent-chats flex-1 flex flex-col w-full overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ChatUserCardSkeleton key={i} />
          ))
        ) : recentChats.length === 0 ? (
          <div className="flex flex-col py-1 items-center justify-center h-full px-4 gap-3">
            <MdEmail size={64} className="text-[var(--text-secondary)]" />
            <div className="text-[2.5rem] font-semibold">No chats yet.</div>
            <div className="text-[2rem] text-center text-[var(--text-secondary)]">
              Start by selecting a contact
            </div>
            <div className="text-[2rem] text-center text-[var(--text-secondary)]">
              and say hello!
            </div>
            <div
              onClick={() => setSelectedMenu("contacts")}
              className="bg-[linear-gradient(135deg,_#a855f7_0%,_#7c5aff_50%,_#3b82f6_100%)] px-4 py-3 rounded-lg font-semibold text-white cursor-pointer"
            >
              Go to contacts
            </div>
          </div>
        ) : (
          filteredChats.map((chat: conversationSummary) => (
            <ChatUserCard
              key={chat.partnerId}
              type="chat"
              partnerId={chat.partnerId}
              fullName={chat.partnerFullName}
              profileUrl={chat.partnerProfileUrl}
              timestamp={chat.timestamp}
              senderId={chat.senderId}
              content={chat.content}
              contentType={chat.contentType}
              newMessagesCount={chat.newMessagesCount}
              currentUserId={user.id}
              status={chat.status}
              lastSeen={chat.partnerLastSeen}
              onlineStatus={chat.partnerOnlineStatus}
              isTyping={false}
              onClick={() => handleOnChatSelect(chat.partnerId)}
            />
          ))
        )}
        <div className="min-h-[100px]"></div>
      </div>
    </div>
  );
};
