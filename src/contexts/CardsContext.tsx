import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { generateDeck, Card } from "../utils/deck";
import StageContext from "./StageContext";

// Define the shape of the cards context
interface CardsContextProps {
  deck: Card[];
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  resetDeck: () => void;
}

// Default values for the context
const defaultValue: CardsContextProps = {
  deck: [],
  setDeck: () => {},
  resetDeck: () => {},
};

// Create the context
const CardsContext = createContext<CardsContextProps>(defaultValue);

// Create the provider
export const CardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>(() => generateDeck());
  const { stage } = useContext(StageContext);

  // Function to reset the deck
  const resetDeck = () => {
    setDeck(generateDeck());
  };

  useEffect(() => {
    console.log("Deck: ", deck);
  }, [stage]);

  return (
    <CardsContext.Provider value={{ deck, setDeck, resetDeck }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
