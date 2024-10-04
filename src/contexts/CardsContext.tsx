import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Card } from "types/cards";
import { generateDeck } from "../utils/deck";
import StageContext from "./StageContext";

interface CardsContextProps {
  deck: Card[];
  burn: Card[];
  communityCards: Card[];
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  resetDeck: () => void;
  addToCommunity: (cards: Card[]) => void;
  addToBurn: (card: Card) => void;
}

// Default values for the context
const defaultValue: CardsContextProps = {
  deck: [],
  burn: [],
  communityCards: [],
  setDeck: () => {},
  resetDeck: () => {},
  addToCommunity: () => {},
  addToBurn: () => {},
};

// Create the context
const CardsContext = createContext<CardsContextProps>(defaultValue);

// Create the provider
export const CardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>(() => generateDeck());
  const [burn, setBurn] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const { stage } = useContext(StageContext);

  // Function to reset the deck
  const resetDeck = () => {
    setDeck(generateDeck());
    setBurn([]);
    setCommunityCards([]);
  };

  // Function to add cards to the community
  const addToCommunity = (cards: Card[]) => {
    setCommunityCards((prev) => [...prev, ...cards]);
  };

  // Function to add a card to the burn pile
  const addToBurn = (card: Card) => {
    setBurn((prev) => [...prev, card]);
  };

  useEffect(() => {
    console.log("Deck: ", deck);
    // console.log("Burn pile: ", burn);
    console.log("Community cards: ", communityCards);
  }, [stage]);

  return (
    <CardsContext.Provider
      value={{
        deck,
        burn,
        communityCards,
        setDeck,
        resetDeck,
        addToCommunity,
        addToBurn,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
