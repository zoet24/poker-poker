import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "types/players";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

// Define the shape of the PlayersContext data
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

// Default values for the context
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

// Create the context
const BettingContext = createContext<BettingContextProps>(defaultValue);

// Create the provider
export const BettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const [minimumBet, setMinimumBet] = useState<number>(0);
  const { stage } = useContext(StageContext);
  const { players, setPlayers, removePlayer } = useContext(PlayersContext);

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
          let updatedMoney = player.money - betAmount;
          updatedMoney = Math.max(0, Math.round(updatedMoney * 100) / 100);

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
    const activePlayers = players.filter((player) => !player.hasFolded);

    const activeSmallBlindIndex = activePlayers.findIndex(
      (player) => player.role.isSmallBlind
    );

    const startIndex = activeSmallBlindIndex !== -1 ? activeSmallBlindIndex : 0;

    // Iterate over active players starting from the small blind
    for (let i = 0; i < activePlayers.length; i++) {
      const currentPlayer =
        activePlayers[(startIndex + i) % activePlayers.length];

      if (currentPlayer.money === 0) {
        continue;
      }

      // Check if the player is a computer or not
      if (currentPlayer.isComp) {
        const originalIndex = players.findIndex(
          (p) => p.name === currentPlayer.name
        );
        takePlayerBet(originalIndex, 0.2);
      } else {
        await openBetModal(currentPlayer);
      }
    }
  };

  const smallBlind = 0.1;
  const bigBlind = smallBlind * 2;

  const handleBlinds = () => {
    const smallBlindPlayer = players.find((player) => player.role.isSmallBlind);
    const bigBlindPlayer = players.find((player) => player.role.isBigBlind);

    if (smallBlindPlayer) {
      const smallBlindIndex = players.findIndex(
        (p) => p.name === smallBlindPlayer.name
      );
      takePlayerBet(smallBlindIndex, smallBlind);
    }

    if (bigBlindPlayer) {
      const bigBlindIndex = players.findIndex(
        (p) => p.name === bigBlindPlayer.name
      );
      takePlayerBet(bigBlindIndex, bigBlind);
    }
  };

  const handleDealBets = async () => {
    setMinimumBet(bigBlind);

    for (let i = 0; i < players.length; i++) {
      const currentPlayer = players[i];

      // Skip players who have folded
      if (currentPlayer.hasFolded) {
        continue;
      }

      if (currentPlayer.role.isSmallBlind) {
        // Small blind needs to put in an additional 10p to match big blind
        const additionalBet = bigBlind - smallBlind; // 0.1 already paid
        if (additionalBet > 0) {
          takePlayerBet(i, additionalBet);
        }
      } else if (currentPlayer.role.isBigBlind) {
        // Big blind has already paid the minimum, no action needed
        continue;
      } else {
        // All other players must put in 20p or fold
        if (currentPlayer.isComp) {
          // If it's a computer player, they automatically bet the required amount
          takePlayerBet(i, bigBlind);
        } else {
          // If it's a human player, open the bet modal
          await openPlaceBetModal(currentPlayer);
        }
      }
    }
  };

  // Use effect to handle stage change
  useEffect(() => {
    if (stage === "deal") {
      handleBlinds();
      handleDealBets();
    }
  }, [stage]);

  return (
    <BettingContext.Provider
      value={{
        pot,
        setPot,
        minimumBet,
        setMinimumBet,
        takePlayerBet,
        takePlayersBets,
        placeBetModalState,
        openPlaceBetModal,
        closePlaceBetModal,
        handleDealBets,
        handleBlinds,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
