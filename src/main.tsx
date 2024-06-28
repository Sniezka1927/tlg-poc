import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Buffer } from "buffer";
window.Buffer = Buffer; // This step might be necessary if dependencies access Buffer from a global context.
import WebApp from "@twa-dev/sdk";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
