import React, { useState } from "react";

type ToggleSwitchProps = {
  size: number;
  onClick?: (enabled: boolean) => void;
  value?: boolean;
};

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(props.value || false);

  const handleOnClick = (value: boolean) => {
    setIsEnabled(value);
    if (props.onClick) props.onClick(value);
  };

  return (
    <div
      className={`flex w-${props.size} h-${props.size / 2}  rounded-4xl items-center p-0.5 transition-all duration-300
        ${isEnabled ? "bg-[var(--accent-color)]" : "bg-gray-400"}`}
      onClick={() => handleOnClick(!isEnabled)}
    >
      <div
        className={`w-${props.size / 2 - 1} h-${props.size / 2 - 1} rounded-full bg-[var(--tertiary-color)] cursor-pointer transition-transform duration-300
          ${isEnabled ? "translate-x-8" : "translate-x-0"}`}
      ></div>
    </div>
  );
};
