import React, { useEffect, useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";

import { RxMoon } from "react-icons/rx";
import { useUIContext } from "../../context/UIContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useUIContext();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    console.log("ThemeToggle useEffect isDark:", isDark);
    if (isDark) {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      console.log("Setting light theme");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 bg-gray-700`}
      style={{ borderRadius: "10px" }}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <RxMoon className="w-5 h-5 text-gray-700" />
        ) : (
          <TiWeatherSunny className="w-5 h-5 text-yellow-500" />
        )}
      </div>
    </button>
  );
}
