import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { Card } from "../utils/deck";
import GameContext from "./GameContext";

// Define the Player type
interface Player {
  name: string;
  money: number;
  hand: Card[];
}

// Define the initial players array
const initialPlayers: Player[] = [
  {
    name: "Zoe",
    money: 5.0,
    hand: [],
  },
  {
    name: "Fran",
    money: 4.8,
    hand: [],
  },
  {
    name: "Mike",
    money: 5.22,
    hand: [],
  },
];

// Define the shape of the PlayersContext data
interface PlayersContextProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  resetPlayers: () => void;
}

// Default values for the context
const defaultValue: PlayersContextProps = {
  players: initialPlayers,
  setPlayers: () => {},
  resetPlayers: () => {},
};

// Create the context
const PlayersContext = createContext<PlayersContextProps>(defaultValue);

// Create the provider
export const PlayersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const { stage } = useContext(GameContext);

  // Function to reset players to their initial state
  const resetPlayers = () => {
    setPlayers(initialPlayers);
  };

  useEffect(() => {
    console.log("Players: ", players);
  }, [stage]);

  return (
    <PlayersContext.Provider value={{ players, setPlayers, resetPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
