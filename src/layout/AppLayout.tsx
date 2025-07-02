import React from "react";
import { Alert } from "../components/layout/Alert";
import { NotificationAlert } from "../components/layout/NotificationAlert";
import { LoadingScreen } from "../components/layout/LoadingScreen";
import MediaPreview from "../components/common/MediaPreview";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`app-layout relative w-full h-full`}>
      <MediaPreview />
      <Alert />
      <NotificationAlert />
      <LoadingScreen />
      {children}
    </div>
  );
};
