import React, { createContext, useState, ReactNode } from "react";

// Define the Player type
export interface Player {
  name: string;
}

// Define the shape of the context data
interface PlayersContextProps {
  players: Player[];
  addPlayer: (name: string) => void;
}

export const players = [
  { name: "Zoe" },
  { name: "Fran" },
  { name: "Mike" },
  { name: "Bron" },
];

// Provide a default value for the context
const defaultValue: PlayersContextProps = {
  players,
  addPlayer: () => {},
};

const PlayersContext = createContext<PlayersContextProps>(defaultValue);

// Create a provider component
export const PlayersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(defaultValue.players);

  const addPlayer = (name: string) => {
    setPlayers([...players, { name }]);
  };

  return (
    <PlayersContext.Provider value={{ players, addPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
