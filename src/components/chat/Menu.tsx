import React, { useState } from "react";
import { SiLivechat } from "react-icons/si";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";

import { IoLogOutOutline } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import ProfileIcon from "../common/ProfileIcon/ProfileIcon";
import { Divider } from "../common/Divider";

import { logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../context/UIContext";
import { menuType, themeType } from "../../types/uiTypes";
import ThemeToggle from "../layout/ThemeToggle";

const menu_icon_style = "h-[24px] w-[24px]";

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

const Menu = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const {
    selectedMenu,
    setSelectedMenu,
  }: { selectedMenu: menuType; setSelectedMenu: void } = useUIContext();

  const handleLogout = async () => {
    let response = await logoutUser();
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  const handleMenuClick = (itemKey: menuType) => {
    setSelectedMenu(itemKey);
  };

  return (
    <div
      className="z-100 fixed min-h-[20px] w-full bottom-0 flex p-2 items-center bg-[var(--primary-color)] shadow-[-10px_0px_20px_0px_rgba(0,0,0,0.19)] border-t-[0.5px] border-t-[var(--border-color)]
      md:relative md:w-[78px] md:flex-col md:justify-between md:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.19)] md:border-r-[0.5px] md:border-r-[var(--border-color)]"
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
              className={`flex flex-col justify-center items-center gap-1 cursor-pointer transition-colors duration-200 ${
                selectedMenu === item.key
                  ? "text-[var(--accent-color)] hover:text-[var(--accent-color)]"
                  : hovered === item.key
                    ? "text-[var(--accent-color)]"
                    : "text-[var(--text-muted)] hover:text-[var(--accent-color)]"
              }`}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleMenuClick(item.key)}
            >
              {selectedMenu === item.key ? item.sharp : item.outline}
              <span className="text-[1.25rem] font-bold">{item.key} </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mr-4 md:flex-col">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        <Divider className="md:hidden" type="vertical" />
        <ProfileIcon
          photoURL={null}
          displayName={"Sohil Goud"}
          fontSize={18}
          imageSize={42}
        />
        <div
          className="icon icon-logout pb-5 hover:cursor-pointer justfiy-center items-center hidden text-[var(--text-muted)] hover:text-[var(--accent-color)] md:flex md:flex-col"
          onClick={handleLogout}
        >
          <Divider className="hidden md:block" type="horizontal" />
          <IoLogOutOutline size={24} />
          <span className="text-[1.25rem] font-bold">{"logout"} </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
