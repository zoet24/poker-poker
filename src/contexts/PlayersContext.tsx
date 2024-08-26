import React, { createContext, useState, ReactNode } from "react";

// Define the Player type
interface Player {
  name: string;
}

// Define the shape of the context data
interface PlayersContextProps {
  players: Player[];
  addPlayer: (name: string) => void;
}

// Provide a default value for the context
const defaultValue: PlayersContextProps = {
  players: [
    { name: "Zoe" },
    { name: "Fran" },
    { name: "Mike" },
    { name: "Bron" },
  ],
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
