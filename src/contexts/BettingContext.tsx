import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "../types/players";
import { handleBets, takePlayerBet } from "../utils/betting";
import { closePlaceBetModal, openPlaceBetModal } from "../utils/bettingModals";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface BettingContextProps {
  pot: number;
  setPot: React.Dispatch<React.SetStateAction<number>>;
  minimumBet: number;
  setMinimumBet: React.Dispatch<React.SetStateAction<number>>;
  takePlayerBet: (playerIndex: number, betAmount: number) => void;
  openPlaceBetModal: (player: Player) => Promise<number>;
  closePlaceBetModal: (playerName: string, betAmount: number) => void;
  placeBetModalState: Record<
    string,
    { open: boolean; resolve?: (betAmount: number) => void }
  >;
}

const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  takePlayerBet: () => {},
  openPlaceBetModal: async () => 0,
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
    Record<string, { open: boolean; resolve?: (betAmount: number) => void }>
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
        setPlayers
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
        takePlayerBet: (playerIndex, betAmount) =>
          takePlayerBet(playerIndex, betAmount, setPlayers, setPot),
        openPlaceBetModal: (player) =>
          openPlaceBetModal(player, setPlaceBetModalState),
        closePlaceBetModal: (playerName, betAmount) =>
          closePlaceBetModal(playerName, setPlaceBetModalState, betAmount), // Corrected usage of the close function
        placeBetModalState,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
