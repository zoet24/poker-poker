import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface GameContextProps {}

// Create the context with default values
const GameContext = createContext<GameContextProps | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};

export default GameContext;
