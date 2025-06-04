import { useCallback } from "react";
import { useUIContext } from "../context/UIContext";

export const useUI = () => {
  const { setShowAlert, setAlertType, setAlertMessage } = useUIContext();

  const showAlert = useCallback(
    (type: string, message: string) => {
      setShowAlert(true);
      setAlertType(type);
      setAlertMessage(message);
    },
    [setAlertType, setAlertMessage],
  );

  return {
    showAlert,
  };
};
