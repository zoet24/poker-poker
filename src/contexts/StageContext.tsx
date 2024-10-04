import React, { ReactNode, createContext, useEffect, useState } from "react";
import { GameStage } from "../types/stage";
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

// Define the shape of the context data
interface StageContextProps {
  stage: GameStage;
  setStage: (stage: GameStage) => void;
  nextStage: () => void;
  resetStage: () => void;
}

// Default value for the context
const defaultValue: StageContextProps = {
  stage: "pre-deal",
  setStage: () => {},
  nextStage: () => {},
  resetStage: () => {},
};

const StageContext = createContext<StageContextProps>(defaultValue);

const tipsOn = true;
const tips: Record<GameStage, string[]> = {
  "pre-deal": [
    "Get ready! Review your cards and plan your bets.",
    "Remember to observe the other players' actions closely!",
    "Make sure you understand the starting positions and roles before the deal.",
  ],
  deal: [
    "All players receive their initial two cards. Time to consider your starting hand.",
    "Look at your cards and think about their potential with the community cards.",
    "Are your cards suited or connected? Think about potential combinations.",
  ],
  flop: [
    "Three community cards are revealed. Evaluate your hand strength.",
    "Think about possible draws, like straight or flush draws.",
    "Observe the flop to see if it matches your cards.",
  ],
  turn: [
    "One more community card is added. Consider if you want to raise, check, or fold.",
    "The turn card often determines whether to proceed aggressively or cautiously.",
    "Use the turn card to reassess your chances against other potential hands.",
  ],
  river: [
    "The final community card is revealed. Assess your best possible hand.",
    "It's the last card! Time to evaluate your final hand and plan your next move.",
    "Do you have the nuts, or should you prepare to fold? Think carefully!",
  ],
  showdown: [
    "Show your cards! Let’s see who has the best hand.",
    "Compare your final hand to the others and see if you’ve won.",
    "It’s time to reveal your cards—may the best hand win!",
  ],
};

const getRandomTips = (stage: GameStage): string => {
  const tipsArray = tips[stage];
  const randomIndex = Math.floor(Math.random() * tipsArray.length);
  return tipsArray[randomIndex];
};

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
