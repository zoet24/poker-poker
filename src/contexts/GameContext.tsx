import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CardsContext from "./CardsContext";
import StageContext from "./StageContext";
import PlayersContext from "./PlayersContext";
import { burnCard, dealToCommunity, drawCardFromDeck } from "../utils/deck";
import { evaluateBestHand } from "../utils/game";
import BettingContext from "./BettingContext";
import { Player } from "types/players";

interface GameContextProps {
  resetGame: () => void;
}

const defaultValue: GameContextProps = {
  resetGame: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage, resetStage } = useContext(StageContext);
  const {
    deck,
    communityCards,
    setDeck,
    resetDeck,
    addToCommunity,
    addToBurn,
  } = useContext(CardsContext);
  const {
    players,
    setPlayers,
    resetPlayersHands,
    resetPlayers,
    rotatePlayerRoles,
  } = useContext(PlayersContext);
  const { setPot, takePlayersBets, openPlaceBetModal, handleDealBets } =
    useContext(BettingContext);

  const gameNumber = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    let localDeck = [...deck];

    if (stage === "pre-deal") {
      resetDeck();
      resetPlayersHands();

      if (!isInitialMount.current) {
        gameNumber.current += 1;

        if (gameNumber.current > 1) {
          rotatePlayerRoles();
        }
      } else {
        isInitialMount.current = false;
      }
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
      handleDealBets();
    }

    // Handle flop: burn 1 card, deal 3 cards to community
    else if (stage === "flop") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(3, localDeck, addToCommunity);
      // takePlayersBets(players, openPlaceBetModal);
    }

    // Handle turn: burn 1 card, deal 1 to community
    else if (stage === "turn") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
      // takePlayersBets(players, openPlaceBetModal);
    }

    // Handle river: burn 1 card, deal 1 to community
    else if (stage === "river") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
      // takePlayersBets(players, openPlaceBetModal);
    }

    // Update the global deck
    setDeck(localDeck);
  }, [stage]);

  useEffect(() => {
    if (stage === "flop" || stage === "turn" || stage === "river") {
      if (communityCards.length > 0) {
        // Wait until community cards are updated, then evaluate players' hands
        const updatedPlayers = players.map((player) => {
          const bestHand = evaluateBestHand(player.hand, communityCards);
          return { ...player, bestHand };
        });

        setPlayers(updatedPlayers);
      }
    }
  }, [communityCards]);

  const resetGame = () => {
    gameNumber.current = 0;
    setPot(0);
    resetDeck();
    resetPlayers();
    resetStage();
  };

  return (
    <GameContext.Provider value={{ resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
