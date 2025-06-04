import React from "react";
import { Alert } from "../components/layout/Alert";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`app-layout relative w-full h-lvh`}>
      <Alert />
      {children}
    </div>
  );
};
