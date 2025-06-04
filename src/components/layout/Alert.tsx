import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useUIContext } from "../../context/UIContext";

export const Alert = () => {
  const { alertMessage, showAlert, setShowAlert, alertType } = useUIContext();
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState("red");

  const alertBgColor = {
    error: "bg-red-600",
    warn: "bg-yellow-600",
    info: "bg-blue-600",
  };

  useEffect(() => {
    if (showAlert) {
      setVisible(true);
      setBgColor(alertBgColor[alertType]);
      const timer = setTimeout(() => {
        setVisible(false);
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div
      className={clsx(
        "fixed top-10 right-6 z-50 transition-transform duration-500 ease-in-out transform",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-100",
      )}
    >
      <div
        className={clsx(
          bgColor,
          "flex items-center text-white px-5 py-3 rounded-lg shadow-lg space-x-3",
        )}
      >
        <span>{alertMessage}</span>
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          {"x"}
        </button>
      </div>
    </div>
  );
};
