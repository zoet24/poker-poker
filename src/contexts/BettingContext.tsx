import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player } from "../types/players";
import { handleBets, handleBlinds } from "../utils/betting";
import { closePlaceBetModal, openPlaceBetModal } from "../utils/bettingModals";
import CardsContext from "./CardsContext";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface BettingContextProps {
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
}

const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  openPlaceBetModal: async () => ({ betAmount: 0, hasFolded: false }),
  closePlaceBetModal: () => {},
  placeBetModalState: {},
  resetGame: () => {},
};

const BettingContext = createContext<BettingContextProps>(defaultValue);

export const BettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const [minimumBet, setMinimumBet] = useState<number>(0);
  const { stage, resetStage } = useContext(StageContext);
  const { resetDeck } = useContext(CardsContext);
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

  // Use effect to handle stage change
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

  const resetGame = () => {
    gameNumber.current = 0;
    setPot(0);
    resetDeck();
    resetPlayers();
    resetStage();
  };

  return (
    <BettingContext.Provider
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
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
