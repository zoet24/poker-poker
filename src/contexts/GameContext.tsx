import React, { createContext, useState, ReactNode } from "react";

// Define the possible game stages and the stages array
export type GameStage = "pre-deal" | "deal" | "flop" | "turn" | "river";

// Stages in the game in order
const stages: GameStage[] = ["pre-deal", "deal", "flop", "turn", "river"];

// Define the shape of the context data
interface GameContextProps {
  stage: GameStage;
  setStage: (stage: GameStage) => void;
  nextStage: () => void;
  resetStage: () => void;
  stages: GameStage[];
}

// Define the default value for the context
const defaultValue: GameContextProps = {
  stage: "pre-deal",
  setStage: () => {},
  nextStage: () => {},
  resetStage: () => {},
  stages,
};

// Create the context
const GameContext = createContext<GameContextProps>(defaultValue);

// Create a provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stage, setStage] = useState<GameStage>("pre-deal");

  // Function to progress to the next stage
  const nextStage = () => {
    const currentIndex = stages.indexOf(stage);
    const nextIndex = (currentIndex + 1) % stages.length; // Use modulus to wrap around
    setStage(stages[nextIndex]);
  };

  // Function to reset the stage
  const resetStage = () => {
    setStage("pre-deal");
  };

  return (
    <GameContext.Provider
      value={{ stage, setStage, nextStage, resetStage, stages }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
