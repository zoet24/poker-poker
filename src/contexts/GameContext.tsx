import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player } from "../types/players";
import { closePlaceBetModal, openPlaceBetModal } from "../utils/bettingModals";
import {
  determineWinnersAndDistributePot,
  evaluatePlayersHands,
  handleBets,
  handleBlinds,
  handleStageTransition,
} from "../utils/game";
import CardsContext from "./CardsContext";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface GameContextProps {
  pot: number;
  setPot: React.Dispatch<React.SetStateAction<number>>;
  minimumBet: number;
  setMinimumBet: React.Dispatch<React.SetStateAction<number>>;
  openPlaceBetModal: (
    player: Player
  ) => Promise<{ betAmount: number; hasFolded: boolean }>;
  closePlaceBetModal: (
    playerName: string,
    result: { betAmount: number; hasFolded: boolean }
  ) => void;
  placeBetModalState: Record<
    string,
    {
      open: boolean;
      resolve?: (result: { betAmount: number; hasFolded: boolean }) => void;
    }
  >;
  resetGame: () => void;
  handleEndGame: () => void;
}

const defaultValue: GameContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  openPlaceBetModal: async () => ({ betAmount: 0, hasFolded: false }),
  closePlaceBetModal: () => {},
  placeBetModalState: {},
  resetGame: () => {},
  handleEndGame: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const [minimumBet, setMinimumBet] = useState<number>(0);
  const { stage, setStage, resetStage } = useContext(StageContext);
  const {
    deck,
    communityCards,
    setDeck,
    addToCommunity,
    addToBurn,
    resetDeck,
  } = useContext(CardsContext);
  const { players, setPlayers, resetPlayers, resetPlayersHands } =
    useContext(PlayersContext);
  const smallBlind = 0.1;
  const bigBlind = smallBlind * 2;

  const [placeBetModalState, setPlaceBetModalState] = useState<
    Record<
      string,
      {
        open: boolean;
        resolve?: (result: { betAmount: number; hasFolded: boolean }) => void;
      }
    >
  >({});

  const gameNumber = useRef(0);
  const isInitialMount = useRef(true);

  // Handle stage changes and execute relevant game logic
  useEffect(() => {
    if (stage === "pre-deal") {
      if (!isInitialMount.current) {
        gameNumber.current += 1;
        const rotatePlayers = gameNumber.current > 1;

        handleBlinds(
          players,
          setPlayers,
          setPot,
          smallBlind,
          bigBlind,
          rotatePlayers
        );
        resetPlayersHands();
        setMinimumBet(bigBlind);
      } else {
        isInitialMount.current = false;
      }
    }

    if (stage === "deal") {
      handleBets(
        players,
        (player: Player) => openPlaceBetModal(player, setPlaceBetModalState),
        setPlayers,
        setPot,
        bigBlind,
        setMinimumBet
      );
    }

    if (stage === "flop" || stage === "turn" || stage === "river") {
      handleBets(
        players,
        (player: Player) => openPlaceBetModal(player, setPlaceBetModalState),
        setPlayers,
        setPot,
        0,
        setMinimumBet
      );
    }
  }, [stage]);

  // Handle deck and player state transitions during game stages
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

  // Evaluate players' hands after community cards are updated
  useEffect(() => {
    if (stage === "flop" || stage === "turn" || stage === "river") {
      if (communityCards.length > 0) {
        evaluatePlayersHands(players, communityCards, setPlayers);
      }
    }
  }, [communityCards]);

  // Automatically end game if all but one player has folded
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
    <GameContext.Provider
      value={{
        pot,
        setPot,
        minimumBet,
        setMinimumBet,
        openPlaceBetModal: (player) =>
          openPlaceBetModal(player, setPlaceBetModalState),
        closePlaceBetModal: (playerName, result) =>
          closePlaceBetModal(playerName, setPlaceBetModalState, result),
        placeBetModalState,
        resetGame,
        handleEndGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
