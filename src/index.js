import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { StageProvider } from "./contexts/StageContext";
import { CardsProvider } from "./contexts/CardsContext";
import { PlayersProvider } from "./contexts/PlayersContext";
import { BettingProvider } from "./contexts/BettingContext";
import { GameProvider } from "./contexts/GameContext";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StageProvider>
      <CardsProvider>
        <PlayersProvider>
          <BettingProvider>
            <GameProvider>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </GameProvider>
          </BettingProvider>
        </PlayersProvider>
      </CardsProvider>
    </StageProvider>
  </React.StrictMode>
);
