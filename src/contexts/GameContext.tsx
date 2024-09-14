import React, { createContext, ReactNode, useContext, useEffect } from "react";
import CardsContext from "./CardsContext";
import StageContext from "./StageContext";
import PlayersContext from "./PlayersContext";
import { drawCardFromDeck } from "../utils/deck";
import { Card } from "types/cards";

interface GameContextProps {}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage } = useContext(StageContext);
  const { deck, setDeck, resetDeck, addToCommunity, addToBurnPile } =
    useContext(CardsContext);
  const { players, setPlayers, resetPlayersHands } = useContext(PlayersContext);

  useEffect(() => {
    let localDeck = [...deck];

    // Function to burn a card
    const burnCard = () => {
      const [burnedCard, newLocalDeck] = drawCardFromDeck(localDeck);
      localDeck = newLocalDeck;
      if (burnedCard) {
        addToBurnPile(burnedCard);
      }
    };

    // Function to deal a card to the community cards
    const dealToCommunity = (numberOfCards: number) => {
      const communityCards: Card[] = [];
      for (let i = 0; i < numberOfCards; i++) {
        const [card, newLocalDeck] = drawCardFromDeck(localDeck);
        localDeck = newLocalDeck;
        if (card) {
          communityCards.push(card);
        }
      }
      addToCommunity(communityCards);
    };

    // Handle pre-deal: reset deck and clear players' hands
    if (stage === "pre-deal") {
      resetDeck();
      resetPlayersHands();
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
      burnCard();
      dealToCommunity(3); // Deal 3 cards to community
    }

    // Handle turn: burn 1 card, deal 1 card to community
    else if (stage === "turn") {
      burnCard();
      dealToCommunity(1); // Deal 1 card to community
    }

    // Handle river: burn 1 card, deal 1 card to community
    else if (stage === "river") {
      burnCard();
      dealToCommunity(1); // Deal 1 card to community
    }

    // Update the global deck
    setDeck(localDeck);
  }, [stage]);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
