import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "types/players";
import StageContext from "./StageContext";

// Define the initial players array
const initialPlayerMoney = 1;
const initialPlayers: Player[] = [
  {
    name: "Zoe",
    money: initialPlayerMoney,
    hand: [],
    bestHand: null,
    showCards: true,
    isComp: false,
    hasFolded: false,
    role: {
      isDealer: true,
      isSmallBlind: false,
      isBigBlind: false,
    },
  },
  {
    name: "Fran",
    money: initialPlayerMoney,
    hand: [],
    bestHand: null,
    showCards: false,
    isComp: true,
    hasFolded: false,
    role: {
      isDealer: false,
      isSmallBlind: true,
      isBigBlind: false,
    },
  },
  // {
  //   name: "Mike",
  //   money: initialPlayerMoney,
  //   hand: [],
  //   bestHand: null,
  //   showCards: false,
  //   isComp: true,
  //   hasFolded: false,
  //   role: {
  //     isDealer: false,
  //     isSmallBlind: false,
  //     isBigBlind: true,
  //   },
  // },
  // {
  //   name: "Bron",
  //   money: initialPlayerMoney,
  //   hand: [],
  //   bestHand: null,
  //   showCards: false,
  //   isComp: true,
  //   hasFolded: false,
  //   role: {
  //     isDealer: false,
  //     isSmallBlind: false,
  //     isBigBlind: false,
  //   },
  // },
  // {
  //   name: "Char",
  //   money: initialPlayerMoney,
  //   hand: [],
  //   bestHand: null,
  //   showCards: false,
  //   isComp: true,
  //   hasFolded: false,
  //   role: {
  //     isDealer: false,
  //     isSmallBlind: false,
  //     isBigBlind: false,
  //   },
  // },
];

// Define the shape of the PlayersContext data
interface PlayersContextProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  resetPlayers: () => void;
  resetPlayersHands: () => void;
  toggleShowCards: (index: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (playerIndex: number) => void;
  rotatePlayerRoles: () => void;
  rolesUpdated: boolean; // New flag to determine role rotation completion
  setRolesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Default values for the context
const defaultValue: PlayersContextProps = {
  players: initialPlayers,
  setPlayers: () => {},
  resetPlayers: () => {},
  resetPlayersHands: () => {},
  toggleShowCards: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
  rotatePlayerRoles: () => {},
  rolesUpdated: false,
  setRolesUpdated: () => {},
};

// Create the context
const PlayersContext = createContext<PlayersContextProps>(defaultValue);

// Create the provider
export const PlayersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rolesUpdated, setRolesUpdated] = useState(false);
  const { stage } = useContext(StageContext);

  // Function to reset players to their initial state
  const resetPlayers = () => {
    setPlayers(initialPlayers);
  };

  // Function to reset players' hands to an empty array
  const resetPlayersHands = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => ({
        ...player,
        hand: [],
        bestHand: null,
        showCards: player.isComp ? false : true,
        hasFolded: false,
      }))
    );
  };

  // Toggle the 'showCards' state for a player at a given index
  const toggleShowCards = (index: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, showCards: !player.showCards } : player
      )
    );
  };

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      name,
      money: initialPlayerMoney,
      hand: [],
      bestHand: null,
      showCards: false,
      isComp: true,
      hasFolded: false,
      role: {
        isDealer: false,
        isBigBlind: false,
        isSmallBlind: false,
      },
    };
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, newPlayer];
      return rotateRoles(updatedPlayers, true);
    });
  };

  const removePlayer = (playerIndex: number) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.filter(
        (_, index) => index !== playerIndex
      );

      // Check if any role (Dealer, Small Blind, Big Blind) is missing after removal
      const dealerExists = updatedPlayers.some(
        (player) => player.role.isDealer
      );
      const smallBlindExists = updatedPlayers.some(
        (player) => player.role.isSmallBlind
      );
      const bigBlindExists = updatedPlayers.some(
        (player) => player.role.isBigBlind
      );

      // If any role is missing, reassign roles
      if (!dealerExists || !smallBlindExists || !bigBlindExists) {
        return rotateRoles(updatedPlayers, true);
      }

      return updatedPlayers;
    });
  };

  const rotateRoles = (
    players: Player[],
    addingOrRemovingPlayers: boolean = false
  ): Player[] => {
    const numPlayers = players.length;

    if (numPlayers === 0 || numPlayers === 1) {
      return players;
    }

    const currentDealerIndex = players.findIndex(
      (player) => player.role.isDealer
    );

    let newDealerIndex: number;
    if (addingOrRemovingPlayers && currentDealerIndex !== -1) {
      newDealerIndex = currentDealerIndex; // Dealer stays the same
    } else {
      // If the dealer was removed, assign a new dealer (e.g., first player).
      newDealerIndex = (currentDealerIndex + 1) % players.length;
    }

    const newSmallBlindIndex = (newDealerIndex + 1) % players.length;
    const newBigBlindIndex = (newSmallBlindIndex + 1) % players.length;

    return players.map((player, index) => ({
      ...player,
      role: {
        isDealer: index === newDealerIndex,
        isSmallBlind: index === newSmallBlindIndex,
        isBigBlind: index === newBigBlindIndex,
      },
    }));
  };

  // Function to rotate player roles normally
  const rotatePlayerRoles = () => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = rotateRoles(prevPlayers);
      setRolesUpdated(true);
      return updatedPlayers;
    });
  };

  useEffect(() => {
    console.log("Players: ", players);
  }, [stage]);

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        resetPlayers,
        resetPlayersHands,
        toggleShowCards,
        addPlayer,
        removePlayer,
        rotatePlayerRoles,
        rolesUpdated,
        setRolesUpdated,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
