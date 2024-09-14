import React, { useState, ReactNode, createContext, useEffect } from "react";

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
}

// Default value for the context
const defaultValue: GameContextProps = {
  stage: "pre-deal",
  setStage: () => {},
  nextStage: () => {},
  resetStage: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stage, setStage] = useState<GameStage>("pre-deal");

  // Function to progress to the next stage
  const nextStage = () => {
    const currentIndex = stages.indexOf(stage);
    const nextIndex = (currentIndex + 1) % stages.length;
    setStage(stages[nextIndex]);
  };

  const resetStage = () => {
    setStage("pre-deal");
  };

  useEffect(() => {
    console.log("Stage: ", stage);
  }, [stage]);

  return (
    <GameContext.Provider value={{ stage, setStage, nextStage, resetStage }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
