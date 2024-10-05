import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
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
  resetGame: () => void;
}

const defaultValue: GameContextProps = {
  handleEndGame: () => {},
  resetGame: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage, resetStage, setStage } = useContext(StageContext);
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
    rolesUpdated,
    setRolesUpdated,
    removePlayer,
  } = useContext(PlayersContext);
  const { pot, setPot, takePlayersBets, openPlaceBetModal, handleBlinds } =
    useContext(BettingContext);

  const gameNumber = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    let localDeck = [...deck];

    localDeck = handleStageTransition(
      stage,
      players,
      setPlayers,
      localDeck,
      setDeck,
      addToCommunity,
      addToBurn,
      () => takePlayersBets(players, openPlaceBetModal),
      resetDeck,
      resetPlayersHands,
      rotatePlayerRoles,
      isInitialMount,
      gameNumber,
      removePlayer
    );

    setDeck(localDeck);

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

  const resetGame = () => {
    gameNumber.current = 0;
    setPot(0);
    resetDeck();
    resetPlayers();
    resetStage();
  };

  return (
    <GameContext.Provider value={{ handleEndGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
