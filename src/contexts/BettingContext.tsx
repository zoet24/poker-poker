import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "../types/players";
import {
  handleBlinds,
  handleDealBets,
  takePlayerBet,
  takePlayersBets,
} from "../utils/betting";
import { closePlaceBetModal, openPlaceBetModal } from "../utils/bettingModals";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface BettingContextProps {
  pot: number;
  setPot: React.Dispatch<React.SetStateAction<number>>;
  minimumBet: number;
  setMinimumBet: React.Dispatch<React.SetStateAction<number>>;
  takePlayerBet: (playerIndex: number, betAmount: number) => void;
  takePlayersBets: (
    players: Player[],
    openBetModal: (player: Player) => Promise<void>
  ) => Promise<void>;
  openPlaceBetModal: (player: Player) => Promise<void>;
  closePlaceBetModal: (playerName: string) => void;
  placeBetModalState: Record<string, { open: boolean; resolve?: () => void }>;
  handleDealBets: () => Promise<void>;
  handleBlinds: () => void;
}

const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  takePlayerBet: () => {},
  takePlayersBets: async () => {},
  openPlaceBetModal: async () => {},
  closePlaceBetModal: () => {},
  placeBetModalState: {},
  handleDealBets: async () => {},
  handleBlinds: () => {},
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
    Record<string, { open: boolean; resolve?: () => void }>
  >({});

  // Use effect to handle stage change
  useEffect(() => {
    if (stage === "deal") {
      handleBlinds(
        players,
        setPlayers,
        setPot,
        smallBlind,
        bigBlind,
        setMinimumBet
      );
      handleDealBets(
        players,
        (player) => openPlaceBetModal(player, setPlaceBetModalState),
        setPlayers,
        bigBlind,
        smallBlind,
        setPot
      );
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
        takePlayersBets: (players, openBetModal) =>
          takePlayersBets(players, openBetModal, setPlayers, setPot),
        openPlaceBetModal: (player) =>
          openPlaceBetModal(player, setPlaceBetModalState),
        closePlaceBetModal: (playerName) =>
          closePlaceBetModal(playerName, setPlaceBetModalState),
        placeBetModalState,
        handleDealBets: () =>
          handleDealBets(
            players,
            (player) => openPlaceBetModal(player, setPlaceBetModalState),
            setPlayers,
            bigBlind,
            smallBlind,
            setPot
          ),
        handleBlinds: () =>
          handleBlinds(
            players,
            setPlayers,
            setPot,
            smallBlind,
            bigBlind,
            setMinimumBet
          ),
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
