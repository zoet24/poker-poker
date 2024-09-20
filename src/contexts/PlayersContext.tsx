import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import StageContext from "./StageContext";
import { Player } from "types/players";

// Define the initial players array
const initialMoney = 5;
const initialPlayers: Player[] = [
  {
    name: "Zoe",
    money: initialMoney,
    hand: [],
    bestHand: null,
    showCards: true,
  },
  {
    name: "Fran",
    money: initialMoney,
    hand: [],
    bestHand: null,
    showCards: true,
  },
  {
    name: "Mike",
    money: initialMoney,
    hand: [],
    bestHand: null,
    showCards: true,
  },
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
};

// Create the context
const PlayersContext = createContext<PlayersContextProps>(defaultValue);

// Create the provider
export const PlayersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const { stage } = useContext(StageContext);

  // Function to reset players to their initial state
  const resetPlayers = () => {
    setPlayers(initialPlayers);
  };

  // Function to reset players' hands to an empty array
  const resetPlayersHands = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        hand: [],
        bestHand: null,
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
      money: 5.0,
      hand: [],
      bestHand: null,
      showCards: true,
    };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  const removePlayer = (playerIndex: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((_, index) => index !== playerIndex)
    );
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
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
