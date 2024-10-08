import React, { ReactNode, createContext, useEffect, useState } from "react";
import { GameStage } from "../types/stage";
import { getRandomTips, tipsOn } from "../utils/tips";
import { handleToastSuccess } from "../utils/toasts";

// Stages in the game in order
const stages: GameStage[] = [
  "pre-deal",
  "deal",
  "flop",
  "turn",
  "river",
  "showdown",
];

interface StageContextProps {
  stage: GameStage;
  setStage: (stage: GameStage) => void;
  nextStage: () => void;
  resetStage: () => void;
}

const defaultValue: StageContextProps = {
  stage: "pre-deal",
  setStage: () => {},
  nextStage: () => {},
  resetStage: () => {},
};

const StageContext = createContext<StageContextProps>(defaultValue);

export const StageProvider: React.FC<{ children: ReactNode }> = ({
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

    if (tipsOn) {
      const tips = getRandomTips(stage);
      handleToastSuccess(`${stage}: ${tips}`);
    }
  }, [stage]);

  return (
    <StageContext.Provider value={{ stage, setStage, nextStage, resetStage }}>
      {children}
    </StageContext.Provider>
  );
};

export default StageContext;
