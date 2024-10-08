import React, { createContext, ReactNode, useContext, useEffect } from "react";
import {
  determineWinnersAndDistributePot,
  evaluatePlayersHands,
  handleStageTransition,
} from "../utils/game";
import BettingContext from "./BettingContext";
import CardsContext from "./CardsContext";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface GameContextProps {
  handleEndGame: () => void;
}

const defaultValue: GameContextProps = {
  handleEndGame: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage, setStage } = useContext(StageContext);
  const {
    deck,
    communityCards,
    setDeck,
    resetDeck,
    addToCommunity,
    addToBurn,
  } = useContext(CardsContext);
  const { players, setPlayers } = useContext(PlayersContext);
  const { pot, setPot } = useContext(BettingContext);

  useEffect(() => {
    let localDeck = [...deck];

    localDeck = handleStageTransition(
      stage,
      players,
      setPlayers,
      localDeck,
      addToCommunity,
      addToBurn
    );

    setDeck(localDeck);

    if (stage === "pre-deal") {
      resetDeck();
    }

    if (stage === "showdown") {
      handleEndGame();
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "flop" || stage === "turn" || stage === "river") {
      if (communityCards.length > 0) {
        // Wait until community cards are updated, then evaluate players' hands
        evaluatePlayersHands(players, communityCards, setPlayers);
      }
    }
  }, [communityCards]);

  useEffect(() => {
    const remainingPlayers = players.filter((player) => !player.hasFolded);
    if (remainingPlayers.length === 1 && stage !== "showdown") {
      setStage("showdown");
    }
  }, [players]);

  const handleEndGame = () => {
    determineWinnersAndDistributePot(players, pot, setPlayers, setPot);
  };

  return (
    <GameContext.Provider value={{ handleEndGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
