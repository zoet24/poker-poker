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
  openPlaceBetModal: (player: Player) => Promise<void>;
  closePlaceBetModal: (playerName: string) => void;
  placeBetModalState: Record<string, { open: boolean; resolve?: () => void }>;
}

const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  minimumBet: 0,
  setMinimumBet: () => {},
  takePlayerBet: () => {},
  openPlaceBetModal: async () => {},
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
    Record<string, { open: boolean; resolve?: () => void }>
  >({});

  // Use effect to handle stage change
  useEffect(() => {
    let localMinimumBet = 0;

    if (stage === "deal") {
      // localMinimumBet = bigBlind;
      // setMinimumBet(bigBlind);

      // handleBlinds(players, setPlayers, setPot, smallBlind, bigBlind);
      // handleStageBets(
      //   players,
      //   (player: Player) => openPlaceBetModal(player, setPlaceBetModalState),
      //   setPlayers,
      //   setPot,
      //   smallBlind,
      //   bigBlind,
      //   localMinimumBet,
      //   true
      // );

      handleBets();
    } else if (stage === "flop" || stage === "turn" || stage === "river") {
      // localMinimumBet = 0;
      // setMinimumBet(0);

      // handleStageBets(
      //   players,
      //   (player: Player) => openPlaceBetModal(player, setPlaceBetModalState),
      //   setPlayers,
      //   setPot,
      //   smallBlind,
      //   bigBlind,
      //   localMinimumBet
      // );
      handleBets();
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
        closePlaceBetModal: (playerName) =>
          closePlaceBetModal(playerName, setPlaceBetModalState),
        placeBetModalState,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
