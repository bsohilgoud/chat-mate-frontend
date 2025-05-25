import React, { useState } from "react";
import { SiLivechat } from "react-icons/si";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";

import { IoLogOutOutline } from "react-icons/io5";

import { TbLayoutSidebar } from "react-icons/tb";

import { TbLayoutSidebarFilled } from "react-icons/tb";

import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import "./Menu.scss";
import { logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "sidebar",
    outline: <TbLayoutSidebar />,
    sharp: <TbLayoutSidebarFilled />,
  },
  {
    key: "chat",
    outline: <IoChatbubblesOutline />,
    sharp: <IoChatbubblesSharp />,
  },
  {
    key: "people",
    outline: <IoPeopleOutline />,
    sharp: <IoPeopleSharp />, // No sharp version, fallback to outline
  },
  {
    key: "settings",
    outline: <IoSettingsOutline />,
    sharp: <IoSettingsSharp />,
  },
];

const Menu = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let response = await logoutUser();
    console.log("response: " + response);

    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <div className="logo">
        <div className="icon chat-mate-icon">
          <SiLivechat />
        </div>
      </div>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className="icon"
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === item.key ? item.sharp : item.outline}
          </div>
        ))}
      </div>
      <div className="user-profile">
        <div className="icon icon-logout">
          <IoLogOutOutline onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
