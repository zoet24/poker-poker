import React, {
  useContext,
  useState,
  ReactNode,
  useEffect,
  createContext,
} from "react";
import CardsContext from "contexts/CardsContext";

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

// Create the context
const GameContext = createContext<GameContextProps>(defaultValue);

// Create the provider
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stage, setStage] = useState<GameStage>("pre-deal");
  const { resetDeck } = useContext(CardsContext); // Get resetDeck from CardsContext

  // Reset the deck when the game enters "pre-deal" stage
  useEffect(() => {
    if (stage === "pre-deal") {
      resetDeck();
    }
  }, [stage]);

  // Function to progress to the next stage
  const nextStage = () => {
    const currentIndex = stages.indexOf(stage);
    const nextIndex = (currentIndex + 1) % stages.length; // Loop through stages
    setStage(stages[nextIndex]);
  };

  const resetStage = () => {
    setStage("pre-deal");
  };

  return (
    <GameContext.Provider value={{ stage, setStage, nextStage, resetStage }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
