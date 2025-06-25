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

export const RecentChats = ({ onChatSelect }) => {
  const { recentChats, setRecentChats } = useChatContext();
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
      }, 2000);
    }
  }, []);

  const handleOnChatSelect = (partner_id: string) => {
    // setRecentChats((recentChats) =>
    //   recentChats.map((chat) =>
    //     chat.partnerId === partner_id ? { ...chat, newMessagesCount: 0 } : chat,
    //   ),
    // );
    onChatSelect(partner_id);
  };

  return (
    <>
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Chat </div>
        <SearchInput onChange={handleSearchChange} />
      </div>
      <Divider type="horizontal" />
      <div className="recent-chats flex flex-col w-full h-auto overflow-y-scroll">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ChatUserCardSkeleton key={i} />
            ))
          : filteredChats.map((chat: conversationSummary) => (
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
            ))}
      </div>
    </>
  );
};
