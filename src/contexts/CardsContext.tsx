import React, { createContext, useState, ReactNode } from "react";
import { generateDeck, Card } from "../utils/deck";

// Define the shape of the cards context
interface CardsContextProps {
  deck: Card[];
  resetDeck: () => void;
}

// Default values for the context
const defaultValue: CardsContextProps = {
  deck: [],
  resetDeck: () => {},
};

// Create the context
const CardsContext = createContext<CardsContextProps>(defaultValue);

// Create the provider
export const CardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Pass a function to useState to ensure generateDeck is only called once
  const [deck, setDeck] = useState<Card[]>(() => generateDeck());

  // Function to reset the deck
  const resetDeck = () => {
    setDeck(generateDeck()); // Generate a fresh deck
  };

  return (
    <CardsContext.Provider value={{ deck, resetDeck }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
