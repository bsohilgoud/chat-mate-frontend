import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useUIContext } from "../../context/UIContext";
import { IoWarning } from "react-icons/io5";
import { GrValidate } from "react-icons/gr";
import { MdError } from "react-icons/md";

export const Alert = () => {
  const { alertMessage, showAlert, setShowAlert, alertType } = useUIContext();
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState("red");

  const alertBgColor = {
    error: "bg-red-500",
    warn: "bg-yellow-500",
    info: "bg-green-500",
  };

  const alertIcon = {
    error: <MdError size={24} />,
    warn: <IoWarning size={24} />,
    info: <GrValidate size={24} />,
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
        "fixed top-10 right-0 z-50 transition-transform duration-500 ease-in-out transform",
        visible ? "-translate-x-5 opacity-100" : "translate-x-full opacity-100",
      )}
    >
      <div
        className={clsx(
          bgColor,
          "flex items-center text-white px-5 py-3 rounded-lg shadow-lg space-x-3",
        )}
      >
        {alertIcon[alertType]}
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
