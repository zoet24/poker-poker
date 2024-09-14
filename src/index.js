import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import { CardsProvider } from "./contexts/CardsContext";
import { PlayersProvider } from "./contexts/PlayersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameProvider>
      <CardsProvider>
        <PlayersProvider>
          <App />
        </PlayersProvider>
      </CardsProvider>
    </GameProvider>
  </React.StrictMode>
);
