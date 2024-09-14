import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { StageProvider } from "./contexts/StageContext";
import { CardsProvider } from "./contexts/CardsContext";
import { PlayersProvider } from "./contexts/PlayersContext";
import { GameProvider } from "./contexts/GameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StageProvider>
      <CardsProvider>
        <PlayersProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </PlayersProvider>
      </CardsProvider>
    </StageProvider>
  </React.StrictMode>
);
