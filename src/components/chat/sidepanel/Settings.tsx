import { React, ReactNode, useCallback, useState } from "react";
import { Divider } from "../../common/Divider";
import { useAuthContext } from "../../../context/AuthContext";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import {
  FaBell,
  FaLock,
  FaUser,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import { TbShieldFilled } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import { useUIContext } from "../../../context/UIContext";
import { logoutUser } from "../../../services/api";
import { useChatContext } from "../../../context/ChatContext";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { user } = useAuthContext();
  const { theme, setTheme } = useUIContext();
  const { resetChatContext } = useChatContext();
  const { resetUIContext } = useUIContext();
  const { resetAuthContext } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logoutUser();
    sessionStorage.removeItem("userId");
    resetAuthContext();
    resetChatContext();
    resetUIContext();
    navigate("/login");
  }, [navigate]);

  const settings_options = [
    {
      settingKey: "notifications",
      title: "Notifications",
      icon: <FaBell />,
      type: "toggle",
      value: true,
    },
    {
      settingKey: "theme",
      title: "Dark Mode",
      icon: <MdDarkMode />,
      type: "toggle",
      value: theme == "dark",
      onClick: (enabled: boolean) => {
        setTheme(enabled ? "dark" : "light");
      },
    },
    {
      settingKey: "privacy",
      title: "Privacy",
      icon: <FaLock />,
      type: "parent",
    },
    {
      settingKey: "security",
      title: "Security",
      icon: <TbShieldFilled />,
      type: "parent",
    },
    {
      settingKey: "account",
      title: "Profile",
      icon: <FaUser />,
      type: "parent",
    },
    {
      settingKey: "logout",
      title: "Logout",
      icon: <FaSignOutAlt />,
      type: "link",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="h-full max-h-screen flex flex-col overflow-y-none">
      <div className="sp-header-container w-full flex flex-col py-3 gap-3">
        <div className="sp-header-text text-5xl"> Settings </div>
      </div>
      <Divider type="horizontal" />
      <div className="relative w-full h-[120px] rounded-xl bg-[linear-gradient(135deg,_#a855f7_0%,_#7c5aff_50%,_#3b82f6_100%)] ">
        <div className="absolute flex gap-3 items-center w-full p-3 flex-col top-20">
          <ProfileIcon
            displayName={user?.fullName}
            fontSize={50}
            imageSize={100}
            photoURL={user?.profileUrl}
            userId={user?.id}
            className="border-2 border-[var(--primary-color)]"
          />
          <div className="text-[2.5rem]">{user?.fullName}</div>
        </div>
      </div>

      <div className="mt-[130px] settings-menu flex flex-col">
        {settings_options.map((option) => (
          <SettingsOption key={option.settingKey} {...option} />
        ))}
      </div>
    </div>
  );
};

type SettingsOptionProps = {
  settingKey: string;
  title: string;
  icon: ReactNode;
  settings?: ReactNode;
  type: "toggle" | "select" | "parent" | "link";
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  value?: any;
};

const SettingsOption = (props: SettingsOptionProps) => {
  const [show, setShow] = useState(false);
  const handleOnClick = () => {
    setShow(!show);
    if (props.onClick) props.onClick(show);
  };

  return (
    <div className="flex cursor-pointer flex-col" onClick={handleOnClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-[var(--accent-color)]">{props.icon}</div>
          <div className="text-[1.75rem]">{props.title}</div>
        </div>

        {props.type == "toggle" && (
          <ToggleSwitch size={16} onClick={props.onClick} value={props.value} />
        )}

        {props.type != "toggle" && show && <FaChevronUp />}
        {props.type != "toggle" && !show && <FaChevronRight />}
      </div>
      <Divider type="horizontal" className="px-1 my-1" />
      <div>
        {show && props.settings && (
          <div className="p-2 pb-4 bg-[var(--secondary-color)]">
            {props.settings}
          </div>
        )}
      </div>
    </div>
  );
};
