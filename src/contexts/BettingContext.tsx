import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "../types/players";
import { handleBets } from "../utils/betting";
import { closePlaceBetModal, openPlaceBetModal } from "../utils/bettingModals";
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
}

const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  openPlaceBetModal: async () => ({ betAmount: 0, hasFolded: false }),
  closePlaceBetModal: () => {},
  placeBetModalState: {},
};

const BettingContext = createContext<BettingContextProps>(defaultValue);

export const BettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const [minimumBet, setMinimumBet] = useState<number>(0);
  const { stage } = useContext(StageContext);
  const { players, setPlayers } = useContext(PlayersContext);
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

  // Use effect to handle stage change
  useEffect(() => {
    if (
      stage === "deal" ||
      stage === "flop" ||
      stage === "turn" ||
      stage === "river"
    ) {
      handleBets(
        players,
        (player: Player) => openPlaceBetModal(player, setPlaceBetModalState),
        setPlayers,
        setPot
      );
      console.log("handleBets");
    }
  }, [stage]);

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
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
