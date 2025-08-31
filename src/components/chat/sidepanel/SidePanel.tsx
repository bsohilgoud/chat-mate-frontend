import React, { memo, useCallback, useMemo } from "react";
import { RecentChats } from "./RecentChats";
import { Contacts } from "./Contacts";
import { useUIContext } from "../../../context/UIContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Profile } from "./Profile";
import { useChatContext } from "../../../context/ChatContext";
import { batchMessageStatusUpdateAPI } from "../../../services/api";
import { Settings } from "./Settings";
import { ThemeSettings } from "./settings/ThemeSettings";
import { NotificationSettings } from "./settings/NotificationSetiings";

const SidePanel = memo(({ className }: { className: string }) => {
  const navigate = useNavigate();
  const { setChatPartnerId } = useChatContext();
  const location = useLocation();

  const loadUserChat = useCallback(
    (partner_id: string) => {
      batchMessageStatusUpdateAPI(partner_id, "DELIVERED", "READ");
      setChatPartnerId(partner_id);
      navigate(`/chats/${partner_id}`);
    },
    [navigate],
  );

  // Example destructuring for route logic
  const panelContent = useMemo(() => {
    const path = location.pathname;
    // Remove leading and trailing slashes, then split
    const pathParts = path.replace(/^\/|\/$/g, "").split("/");

    switch (pathParts[0]) {
      case "chats":
        return <RecentChats onChatSelect={loadUserChat} />;
      case "contacts":
        return <Contacts onContactSelect={loadUserChat} />;
      case "settings":
        switch (pathParts[1]) {
          case "theme":
            return <ThemeSettings />;
          case "notifications":
            return <NotificationSettings />;
          default:
            return <Settings />;
        }
      case "profile":
        return <Profile />;
      default:
        return <RecentChats onChatSelect={loadUserChat} />;
    }
  }, [location.pathname, loadUserChat]);

  return (
    <div
      className={`${className} overflow-y-none overflow-x-hidden md:flex md:max-w-[400px] flex-col h-full md:min-w-[400px] bg-[var(--secondary-color)] border-r-[0.5px] border-r-[var(--border-color)] px-4 py-3`}
    >
      {panelContent}
    </div>
  );
});

SidePanel.displayName = "SidePanel";

export default SidePanel;
