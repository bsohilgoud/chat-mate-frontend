import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

import AppRouter from "./AppRouter";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <GoogleOAuthProvider clientId="101950146570-itabjq8seik7qv4978k16iaebpge8nhb.apps.googleusercontent.com">
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </GoogleOAuthProvider>,
  );
} else {
  console.error(
    "Root element not found! Make sure an element with id='root' exists in your HTML.",
  );
}
