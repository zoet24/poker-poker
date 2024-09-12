import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { LayoutProvider } from "v1/contexts/LayoutContext";
import { ChipProvider } from "v1/contexts/ChipContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LayoutProvider>
      <ChipProvider>
        <App />
      </ChipProvider>
    </LayoutProvider>
  </React.StrictMode>
);
