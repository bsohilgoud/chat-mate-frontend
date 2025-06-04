import React, { useState } from "react";
import { useEffect } from "react";
import { FaRegImage } from "react-icons/fa6";
import { useChatContext } from "../../../context/ChatContext";
import { useChat } from "../../../hooks/useChat";
import { formatMessageDateWithDay } from "../../../services/helper";
import { conversationSummary } from "../../../types/chatTypes";
import { Divider } from "../../common/Divider";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { SearchInput } from "../../common/SearchInput";

export const RecentChats = () => {
  const { recentChats }: { recentChats: conversationSummary[] } =
    useChatContext();
  const [filteredChats, setFilteredChats] = useState<conversationSummary[]>([]);

  const { fetchRecentChats } = useChat();

  useEffect(() => {
    setFilteredChats(recentChats);
  }, [recentChats]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      setFilteredChats(recentChats);
    } else {
      const filtered = recentChats.filter((recentChat) =>
        recentChat.partnerFullName.toLowerCase().includes(query),
      );
      setFilteredChats(filtered);
    }
  };

  useEffect(() => {
    if (recentChats.length == 0) {
      fetchRecentChats();
    }
  }, []);

  return (
    <>
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Chat </div>
        <SearchInput onChange={handleSearchChange} />
      </div>
      <Divider type="horizontal" />
      <div className="recent-chats flex flex-col w-full">
        {filteredChats.map((chatSummary: conversationSummary) => (
          <RecentChatCard
            key={chatSummary.partnerId}
            recentChat={chatSummary}
          />
        ))}
      </div>
    </>
  );
};

const RecentChatCard = ({
  recentChat,
}: {
  recentChat: conversationSummary;
}) => {
  const user_id = sessionStorage.getItem("userId");
  const { setChatPartnerId } = useChatContext();

  const loadUserChat = (partner_id: string) => {
    console.log("loading chatpartner --> ");
    setChatPartnerId(partner_id);
  };

  return (
    <div
      className="flex items-center px-2 rounded-md hover:bg-[var(--hover-color)] cursor-pointer"
      onClick={() => {
        console.log("clicked user" + recentChat.partnerId);
        loadUserChat(recentChat.partnerId);
      }}
    >
      <ProfileIcon
        photoURL={recentChat.partnerProfileUrl}
        displayName={recentChat.partnerFullName}
        fontSize={24}
        imageSize={48}
      />
      <div className="conversation-container flex flex-col py-4 flex-1 ml-5 min-w-0 gap-2 border-b-[0.5px] border-b-[var(--border-color)]">
        <div className="name-date-container flex items-center justify-between mb-1">
          <div className="name font-semibold">{recentChat.partnerFullName}</div>
          <div className="date text-[1.25rem] text-gray-500 flex-shrink-0 ml-2">
            {formatMessageDateWithDay(recentChat.timestamp, true)}
          </div>
        </div>
        <div className="message-container flex items-center justify-between">
          <div className="message flex items-center min-w-0">
            <p className="m-0 text-[1.25rem]">
              {recentChat.senderId === user_id ? "You: " : ""}
              {recentChat.contentType === "TEXT" &&
                (recentChat.content.length > 40
                  ? recentChat.content.slice(0, 40) + "..."
                  : recentChat.content)}
              {recentChat.contentType === "IMAGE" && (
                <span className="flex items-center">
                  <FaRegImage size={16} className="ml-1 text-gray-500" />
                  <span className="ml-1">Photo</span>
                </span>
              )}
            </p>
          </div>
          {recentChat.newMessagesCount > 0 && (
            <div className="unread-count flex-shrink-0 ml-2">
              <span className="inline-flex items-center justify-center px-2 py-1 font-bold text-white bg-[var(--accent-color)] rounded-full min-w-[20px] h-5">
                {recentChat.newMessagesCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
