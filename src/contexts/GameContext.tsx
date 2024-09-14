import React, { createContext, ReactNode, useContext, useEffect } from "react";
import CardsContext from "./CardsContext";
import StageContext from "./StageContext";
import PlayersContext from "./PlayersContext";
import { drawCardFromDeck } from "../utils/deck";

interface GameContextProps {}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage } = useContext(StageContext);
  const { deck, setDeck } = useContext(CardsContext);
  const { players, setPlayers } = useContext(PlayersContext);

  useEffect(() => {
    // Deal two cards to each player
    if (stage === "deal") {
      let localDeck = [...deck];

      const updatedPlayers = players.map((player) => {
        let newHand = [...player.hand];

        for (let i = 0; i < 2; i++) {
          const [card, newLocalDeck] = drawCardFromDeck(localDeck);
          localDeck = newLocalDeck;
          if (card) {
            newHand.push(card);
          }
        }

        return {
          ...player,
          hand: newHand,
        };
      });

      setPlayers(updatedPlayers);
      setDeck(localDeck);
    }
  }, [stage]);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
