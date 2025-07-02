import React, { memo, useCallback, useMemo } from "react";
import { RecentChats } from "./RecentChats";
import { Contacts } from "./Contacts";
import { useUIContext } from "../../../context/UIContext";
import { useNavigate } from "react-router-dom";
import { Profile } from "./Profile";
import { useChatContext } from "../../../context/ChatContext";
import { batchMessageStatusUpdateAPI } from "../../../services/api";
import { Sidebar } from "lucide-react";

const SidePanel = memo(({ className }: { className: string }) => {
  const { selectedMenu } = useUIContext();
  const navigate = useNavigate();
  const { setChatPartnerId } = useChatContext();

  const loadUserChat = useCallback(
    (partner_id: string) => {
      batchMessageStatusUpdateAPI(partner_id, "DELIVERED", "READ");
      setChatPartnerId(partner_id);
      navigate(`/chat/${partner_id}`);
    },
    [navigate],
  );

  const current_menu = useMemo(
    () => ({
      contacts: <Contacts onContactSelect={loadUserChat} />,
      chats: <RecentChats onChatSelect={loadUserChat} />,
      settings: <Profile />,
    }),
    [loadUserChat],
  );

  return (
    <div
      className={`${className} overflow-y-none overflow-x-hidden md:flex md:max-w-[400px] flex-col h-full md:min-w-[400px] bg-[var(--secondary-color)] border-r-[0.5px] border-r-[var(--border-color)] px-4 py-3`}
    >
      {current_menu[selectedMenu]}
    </div>
  );
});

SidePanel.displayName = "SidePanel";

export default SidePanel;
