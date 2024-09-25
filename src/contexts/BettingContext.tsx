import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import StageContext from "./StageContext";
import PlayersContext from "./PlayersContext";
import { Player } from "types/players";

// Define the shape of the PlayersContext data
interface BettingContextProps {
  pot: number;
  setPot: React.Dispatch<React.SetStateAction<number>>;
  takePlayerBet: (playerIndex: number, betAmount: number) => void;
  takePlayersBets: (
    players: Player[],
    openBetModal: (player: Player) => Promise<void>
  ) => Promise<void>;
  openPlayerModal: (player: Player) => Promise<void>;
  closePlayerModal: (playerName: string) => void;
  playerModalState: Record<string, { open: boolean; resolve?: () => void }>;
}

// Default values for the context
const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  takePlayerBet: () => {},
  takePlayersBets: async () => {},
  openPlayerModal: async () => {},
  closePlayerModal: () => {},
  playerModalState: {},
};

// Create the context
const BettingContext = createContext<BettingContextProps>(defaultValue);

// Create the provider
export const BettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const { stage } = useContext(StageContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const [playerModalState, setPlayerModalState] = useState<
    Record<string, { open: boolean; resolve?: () => void }>
  >({});

  const openPlayerModal = (player: Player): Promise<void> => {
    return new Promise((resolve) => {
      setPlayerModalState((prevState) => ({
        ...prevState,
        [player.name]: { open: true, resolve }, // Open the modal and store resolve function
      }));
    });
  };

  const closePlayerModal = (playerName: string) => {
    setPlayerModalState((prevState) => {
      const playerState = prevState[playerName];
      if (playerState?.resolve) {
        playerState.resolve(); // Resolve the promise when the modal is closed
      }
      return {
        ...prevState,
        [playerName]: { open: false }, // Close the modal
      };
    });
  };

  const takePlayerBet = (playerIndex: number, betAmount: number) => {
    console.log("Take player bet");
  };

  const takePlayersBets = async (
    players: Player[],
    openBetModal: (player: Player) => Promise<void>
  ) => {
    // Find the index of the small blind
    const smallBlindIndex = players.findIndex(
      (player) => player.role.isSmallBlind
    );

    // Iterate through players starting from small blind, looping back to the beginning
    for (let i = 0; i < players.length; i++) {
      const currentPlayerIndex = (smallBlindIndex + i) % players.length;
      const currentPlayer = players[currentPlayerIndex];
      await openBetModal(currentPlayer); // Wait for the modal to be closed before proceeding to the next player

      console.log(`Player ${i + 1}: ${players[currentPlayerIndex].name}`);
    }
  };

  // Use effect to handle stage change
  useEffect(() => {
    if (stage === "showdown") {
      // Show all players' cards
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          showCards: true,
        }))
      );

      // Find the highest rank among all non-folded players
      const highestRank = players.reduce((max, player) => {
        if (!player.hasFolded && player.bestHand?.rank !== undefined) {
          return Math.max(max, player.bestHand.rank);
        }
        return max;
      }, 0);

      // Find all players who have the highest rank
      const winners = players.filter(
        (player) => player.bestHand?.rank === highestRank
      );

      if (winners.length > 0) {
        // Split the pot equally among the winners
        const potShare = pot / winners.length;

        // Update players' money with their share of the pot
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            winners.some((winner) => winner.name === player.name)
              ? { ...player, money: player.money + potShare }
              : player
          )
        );

        // Reset the pot after distributing the winnings
        setPot(0);
      }
    }
  }, [stage]);

  return (
    <BettingContext.Provider
      value={{
        pot,
        setPot,
        takePlayerBet,
        takePlayersBets,
        playerModalState,
        openPlayerModal,
        closePlayerModal,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
