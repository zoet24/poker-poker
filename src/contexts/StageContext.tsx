import React, {
  useState,
  ReactNode,
  createContext,
  useEffect,
  useContext,
} from "react";
import { GameStage } from "types/stage";
import CardsContext from "./CardsContext";
import PlayersContext from "./PlayersContext";

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

export const StageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { resetDeck } = useContext(CardsContext);
  const { resetPlayers } = useContext(PlayersContext);
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
    <StageContext.Provider value={{ stage, setStage, nextStage, resetStage }}>
      {children}
    </StageContext.Provider>
  );
};

export default StageContext;
