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
const initialPlayers: Player[] = [
  {
    name: "Zoe",
    money: 5.0,
    hand: [],
    bestHand: null,
    showCards: true,
  },
  {
    name: "Fran",
    money: 4.8,
    hand: [],
    bestHand: null,
    showCards: false,
  },
  {
    name: "Mike",
    money: 5.22,
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
}

// Default values for the context
const defaultValue: PlayersContextProps = {
  players: initialPlayers,
  setPlayers: () => {},
  resetPlayers: () => {},
  resetPlayersHands: () => {},
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

  const resetPlayersHands = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        hand: [],
        bestHand: null,
      }))
    );
  };

  useEffect(() => {
    console.log("Players: ", players);
  }, [stage]);

  return (
    <PlayersContext.Provider
      value={{ players, setPlayers, resetPlayers, resetPlayersHands }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
