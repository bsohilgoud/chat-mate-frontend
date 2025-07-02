import React, { useCallback, useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { useChat } from "../../../hooks/useChat";
import { UserType } from "../../../types/authTypes";
import { Divider } from "../../common/Divider";
import { SearchInput } from "../../common/SearchInput";
import ChatUserCard from "./ChatUserCard";
import ChatUserCardSkeleton from "./ChatUserCardSkeleton";

export const Contacts = ({
  onContactSelect,
}: {
  onContactSelect: (partner_id: string) => void;
}) => {
  const { contactsList }: { contactsList: UserType[] } = useChatContext();
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchAllUsers } = useChat();

  useEffect(() => {
    setFilteredUsers(contactsList);
  }, [contactsList]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase().trim();

      if (query === "") {
        setFilteredUsers(contactsList);
      } else {
        const filtered = contactsList.filter((contactsList) =>
          contactsList.fullName.toLowerCase().includes(query),
        );
        setFilteredUsers(filtered);
      }
    },
    [contactsList],
  );

  useEffect(() => {
    if (contactsList.length == 0) {
      setIsLoading(true);

      setTimeout(() => {
        fetchAllUsers().finally(() => {
          setIsLoading(false);
        });
      }, 200); // 0.2 second delay for testing

      // fetchAllUsers().finally(() => {
      //   setIsLoading(false);
      // });
    }
  }, []);

  return (
    <div className="h-full max-h-screen flex flex-col overflow-y-none">
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Contacts </div>
        <SearchInput onChange={handleSearchChange} />
      </div>
      <Divider type="horizontal" />
      <div className="contacts flex-1 flex flex-col w-full overflow-y-auto">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ChatUserCardSkeleton key={index} />
            ))
          : filteredUsers.map((user: UserType) => (
              <ChatUserCard
                key={user.id}
                type="contact"
                fullName={user.fullName}
                profileUrl={user.profileUrl}
                partnerId={user.id}
                isTyping={false}
                lastSeen={user.lastSeen}
                onlineStatus={user.onlineStatus}
                onClick={() => {
                  onContactSelect(user.id);
                }}
              />
            ))}
        <div className="min-h-[100px]"></div>
      </div>
    </div>
  );
};
