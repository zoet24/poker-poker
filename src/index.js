import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { LayoutProvider } from "contexts/LayoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </React.StrictMode>
);
