import React from "react";
import { RecentChats } from "./RecentChats";
import { Contacts } from "./Contacts";
import { useUIContext } from "../../../context/UIContext";

export const SidePanel = () => {
  const { selectedMenu } = useUIContext();

  const current_menu = {
    contacts: <Contacts />,
    chats: <RecentChats />,
  };

  return (
    <div
      className="side-panel overflow-y-none flex-1 h-screen min-w-[350px] bg-[var(--secondary-color)] border-r-[0.5px] border-r-[var(--border-color)] px-4 py-3
      md:flex-none min-w-[400px]"
    >
      {current_menu[selectedMenu]}
    </div>
  );
};
