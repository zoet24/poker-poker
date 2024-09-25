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
  openPlaceBetModal: (player: Player) => Promise<void>;
  closePlaceBetModal: (playerName: string) => void;
  placeBetModalState: Record<string, { open: boolean; resolve?: () => void }>;
}

// Default values for the context
const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  takePlayerBet: () => {},
  takePlayersBets: async () => {},
  openPlaceBetModal: async () => {},
  closePlaceBetModal: () => {},
  placeBetModalState: {},
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

  const [placeBetModalState, setPlaceBetModalState] = useState<
    Record<string, { open: boolean; resolve?: () => void }>
  >({});

  const openPlaceBetModal = (player: Player | undefined): Promise<void> => {
    return new Promise((resolve) => {
      if (!player) {
        console.error("Player is undefined or null, cannot open modal");
        resolve(); // Resolve immediately if the player is invalid
        return;
      }

      if (!player.hasFolded) {
        // Only open the modal if the player has not folded
        setPlaceBetModalState((prevState) => ({
          ...prevState,
          [player.name]: { open: true, resolve },
        }));
      } else {
        // Automatically resolve the promise if the player has folded
        resolve();
      }
    });
  };

  const closePlaceBetModal = (playerName: string) => {
    setPlaceBetModalState((prevState) => {
      const playerState = prevState[playerName];
      if (playerState?.resolve) {
        playerState.resolve();
      }
      return {
        ...prevState,
        [playerName]: { open: false },
      };
    });
  };

  const takePlayerBet = (playerIndex: number, betAmount: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === playerIndex) {
          const updatedMoney = player.money - betAmount;

          return {
            ...player,
            money: Math.max(0, updatedMoney),
          };
        }
        return player;
      })
    );

    setPot((prevPot) => prevPot + betAmount);
  };

  const takePlayersBets = async (
    players: Player[],
    openBetModal: (player: Player) => Promise<void>
  ) => {
    const smallBlindIndex = players.findIndex(
      (player) => player.role.isSmallBlind
    );

    const activePlayers = players.filter((player) => !player.hasFolded);

    for (let i = 0; i < activePlayers.length; i++) {
      const currentPlayerIndex = (smallBlindIndex + i) % players.length;
      const currentPlayer = activePlayers[currentPlayerIndex];
      await openBetModal(currentPlayer);
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
        placeBetModalState,
        openPlaceBetModal,
        closePlaceBetModal,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
