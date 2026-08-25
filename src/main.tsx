import App from "@src/App";
import "@src/i18n";
import "@src/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const storedTheme = localStorage.getItem("trc-theme");
const shouldUseDarkTheme = storedTheme ? storedTheme === "dark" : true;

document.documentElement.classList.toggle("dark", shouldUseDarkTheme);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
