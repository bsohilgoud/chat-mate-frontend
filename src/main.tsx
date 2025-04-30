import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import AppRouter from "./AppRouter";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  );
} else {
  console.error(
    "Root element not found! Make sure an element with id='root' exists in your HTML.",
  );
}
