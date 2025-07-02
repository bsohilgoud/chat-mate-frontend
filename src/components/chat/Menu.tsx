import React, { useEffect, useMemo, useCallback, memo } from "react";
import { SiLivechat } from "react-icons/si";
import {
  IoChatbubblesOutline,
  IoChatbubblesSharp,
  IoPeopleOutline,
  IoPeopleSharp,
  IoLogOutOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import ProfileIcon from "../common/ProfileIcon/ProfileIcon";
import { Divider } from "../common/Divider";
import { logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../context/UIContext";
import { useChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContext";
import ThemeToggle from "../layout/ThemeToggle";
import { conversationSummary } from "../../types/chatTypes";
import { menuType } from "../../types/uiTypes";

const menu_icon_style = "h-[24px] w-[24px] opacity-95";

const menuItems = [
  {
    key: "chats",
    outline: <IoChatbubblesOutline className={menu_icon_style} />,
    sharp: <IoChatbubblesSharp className={menu_icon_style} />,
  },
  {
    key: "contacts",
    outline: <IoPeopleOutline className={menu_icon_style} />,
    sharp: <IoPeopleSharp className={menu_icon_style} />,
  },
  {
    key: "settings",
    outline: <IoSettingsOutline className={menu_icon_style} />,
    sharp: <IoSettingsSharp className={menu_icon_style} />,
  },
];

const Menu = memo(({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  const {
    unReadMessagesCount,
    setUnReadMessagesCount,
    recentChats,
    resetChatContext,
  } = useChatContext();
  const { selectedMenu, setSelectedMenu, resetUIContext } = useUIContext();
  const { user, isLoading, resetAuthContext } = useAuthContext();

  const handleLogout = useCallback(async () => {
    await logoutUser();
    sessionStorage.removeItem("userId");
    resetAuthContext();
    resetChatContext();
    resetUIContext();
    navigate("/login");
  }, [navigate]);

  const handleMenuClick = useCallback(
    (itemKey: menuType) => {
      setSelectedMenu(itemKey);
    },
    [setSelectedMenu],
  );

  const calculatedUnreadCount = useMemo(() => {
    return recentChats.reduce(
      (count, chat: conversationSummary) => count + chat.newMessagesCount,
      0,
    );
  }, [recentChats]);

  useEffect(() => {
    if (unReadMessagesCount !== calculatedUnreadCount) {
      setUnReadMessagesCount(calculatedUnreadCount);
    }
  }, [calculatedUnreadCount, unReadMessagesCount, setUnReadMessagesCount]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`z-100 fixed min-h-[20px] w-full bottom-0 flex p-2 items-center bg-[var(--primary-color)] shadow-[-10px_0px_20px_0px_rgba(0,0,0,0.19)] border-t-[0.5px] border-t-[var(--border-color)]
      md:relative md:flex md:w-[78px] md:flex-col md:justify-between md:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.19)] md:border-r-[0.5px] md:border-r-[var(--border-color)] ${className}`}
    >
      <div className="logo hidden md:block">
        <div className="icon chat-mate-icon pt-4">
          <SiLivechat size={42} color="var(--accent-color)" />
        </div>
      </div>
      <div className="flex flex-1 p-2 justify-around md:flex-none md:flex-col md:gap-10">
        {menuItems.map((item) => (
          <div key={item.key}>
            <div
              className={`relative flex flex-col justify-center items-center gap-1 cursor-pointer transition-colors duration-200 ${
                selectedMenu === item.key
                  ? "text-[var(--accent-color)] hover:text-[var(--accent-color)]"
                  : "text-[var(--text-muted)] hover:text-[var(--accent-color)]"
              }`}
              onClick={() => handleMenuClick(item.key)}
            >
              <div className="relative">
                {selectedMenu === item.key ? item.sharp : item.outline}
                {item.key === "chats" && (
                  <span className="unread-messages absolute top-[-5px] right-[-7px] flex items-center font-bold justify-center rounded-full text-white text-[1rem] px-3 w-7 h-7 bg-red-500">
                    {unReadMessagesCount}
                  </span>
                )}
              </div>
              <span className="text-[1.25rem] font-bold">{item.key} </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mr-4 md:flex-col">
        <div className="mb-4 hidden md:block">
          <ThemeToggle />
        </div>
        <Divider className="flex md:hidden" type="vertical" />
        <ProfileIcon
          photoURL={user.profileUrl}
          displayName={user.fullName}
          fontSize={18}
          imageSize={42}
          userId={user.id}
        />
        <div
          className="icon icon-logout pb-5 hover:cursor-pointer justfiy-center items-center hidden text-[var(--text-muted)] hover:text-red-400 md:flex md:flex-col"
          onClick={handleLogout}
        >
          <Divider className="hidden md:block" type="horizontal" />
          <IoLogOutOutline size={24} />
          <span className="text-[1.25rem] font-bold">{"logout"} </span>
        </div>
      </div>
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;
