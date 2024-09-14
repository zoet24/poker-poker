import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { generateDeck } from "../utils/deck";
import StageContext from "./StageContext";
import { Card } from "types/cards";

// Define the shape of the cards context
interface CardsContextProps {
  deck: Card[];
  burnPile: Card[];
  communityCards: Card[];
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  resetDeck: () => void;
  addToCommunity: (cards: Card[]) => void;
  addToBurnPile: (card: Card) => void;
}

// Default values for the context
const defaultValue: CardsContextProps = {
  deck: [],
  burnPile: [],
  communityCards: [],
  setDeck: () => {},
  resetDeck: () => {},
  addToCommunity: () => {},
  addToBurnPile: () => {},
};

// Create the context
const CardsContext = createContext<CardsContextProps>(defaultValue);

// Create the provider
export const CardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>(() => generateDeck());
  const [burnPile, setBurnPile] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const { stage } = useContext(StageContext);

  // Function to reset the deck
  const resetDeck = () => {
    setDeck(generateDeck());
    setBurnPile([]);
    setCommunityCards([]);
  };

  // Function to add cards to the community
  const addToCommunity = (cards: Card[]) => {
    setCommunityCards((prev) => [...prev, ...cards]);
  };

  // Function to add a card to the burn pile
  const addToBurnPile = (card: Card) => {
    setBurnPile((prev) => [...prev, card]);
  };

  useEffect(() => {
    console.log("Deck: ", deck);
    console.log("Burn pile: ", burnPile);
    console.log("Community cards: ", communityCards);
  }, [stage, burnPile, communityCards]);

  return (
    <CardsContext.Provider
      value={{
        deck,
        burnPile,
        communityCards,
        setDeck,
        resetDeck,
        addToCommunity,
        addToBurnPile,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
