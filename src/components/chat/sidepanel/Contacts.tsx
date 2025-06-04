import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { useChat } from "../../../hooks/useChat";
import { UserType } from "../../../types/authTypes";
import { Divider } from "../../common/Divider";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import { SearchInput } from "../../common/SearchInput";

export const Contacts = () => {
  const { contactsList }: { contactsList: UserType[] } = useChatContext();
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchAllUsers } = useChat();

  useEffect(() => {
    setFilteredUsers(contactsList);
  }, [contactsList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      setFilteredUsers(contactsList);
    } else {
      const filtered = contactsList.filter((contactsList) =>
        contactsList.fullName.toLowerCase().includes(query),
      );
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    if (contactsList.length == 0) {
      setIsLoading(true);

      // Add timeout for testing skeleton loader
      setTimeout(() => {
        fetchAllUsers().finally(() => {
          setIsLoading(false);
        });
      }, 10000); // 3 second delay for testing

      // fetchAllUsers().finally(() => {
      //   setIsLoading(false);
      // });
    }
  }, []);

  return (
    <>
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Contacts </div>
        <SearchInput onChange={handleSearchChange} />
      </div>
      <Divider type="horizontal" />
      <div className="recent-chats flex flex-col w-full mb-40">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ContactSkeleton key={index} />
            ))
          : filteredUsers.map((user: UserType) => (
              <UserContactCard key={user.id} user={user} />
            ))}
      </div>
    </>
  );
};

const ContactSkeleton = () => {
  return (
    <div className="flex items-center px-2 rounded-md animate-pulse">
      <div className="w-18 h-18 bg-gray-300 rounded-full flex-shrink-0"></div>

      <div className="conversation-container flex flex-col py-4 flex-1 ml-5 min-w-0 gap-2 border-b-[0.5px] border-b-[var(--border-color)]">
        <div className="name-date-container flex items-center justify-between mb-1">
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="message-container flex items-center justify-between">
          <div className="message flex items-center min-w-0 w-full">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserContactCard = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center px-2 rounded-md hover:bg-[var(--hover-color)] cursor-pointer">
      <ProfileIcon
        photoURL={user.profileUrl}
        displayName={user.fullName}
        fontSize={24}
        imageSize={48}
      />
      <div className="conversation-container flex flex-col py-4 flex-1 ml-5 min-w-0 gap-2 border-b-[0.5px] border-b-[var(--border-color)]">
        <div className="name-date-container flex items-center justify-between mb-1">
          <div className="name font-semibold">{user.fullName}</div>
        </div>
        <div className="message-container flex items-center justify-between">
          <div className="message flex items-center min-w-0">
            <p className="m-0 text-[1.25rem]">Hey! i am using chatmate</p>
          </div>
        </div>
      </div>
    </div>
  );
};
