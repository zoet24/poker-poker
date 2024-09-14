import React, { createContext, ReactNode, useContext, useEffect } from "react";
import CardsContext from "./CardsContext";
import StageContext from "./StageContext";
import PlayersContext from "./PlayersContext";
import { burnCard, dealToCommunity, drawCardFromDeck } from "../utils/deck";
import { Card } from "types/cards";

interface GameContextProps {}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage } = useContext(StageContext);
  const { deck, setDeck, resetDeck, addToCommunity, addToBurn } =
    useContext(CardsContext);
  const { players, setPlayers, resetPlayersHands } = useContext(PlayersContext);

  useEffect(() => {
    let localDeck = [...deck];

    // Handle pre-deal: reset deck and clear players' hands
    if (stage === "pre-deal") {
      resetDeck();
      resetPlayersHands();
      return;
    }

    // Handle deal: deal two cards to each player
    else if (stage === "deal") {
      const updatedPlayers = players.map((player) => {
        let newHand = [...player.hand];
        for (let i = 0; i < 2; i++) {
          const [card, newLocalDeck] = drawCardFromDeck(localDeck);
          localDeck = newLocalDeck;
          if (card) {
            newHand.push(card);
          }
        }
        return { ...player, hand: newHand };
      });
      setPlayers(updatedPlayers);
    }

    // Handle flop: burn 1 card, deal 3 cards to community
    else if (stage === "flop") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(3, localDeck, addToCommunity);
    }

    // Handle turn: burn 1 card, deal 1 to community
    else if (stage === "turn") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
    }

    // Handle river: burn 1 card, deal 1 to community
    else if (stage === "river") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
    }

    // Update the global deck
    setDeck(localDeck);
  }, [stage]);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
