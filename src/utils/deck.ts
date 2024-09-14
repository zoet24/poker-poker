import { Card, Rank, Suit } from "types/cards";

const ranks: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

// Function to generate a new deck
export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ rank, suit });
    });
  });
  return shuffleDeck(deck);
};

// Function to shuffle deck
export const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Function to draw card from deck
export const drawCardFromDeck = (localDeck: Card[]): [Card | null, Card[]] => {
  if (localDeck.length === 0) {
    throw new Error("Deck is empty");
  }
  const drawnCard = localDeck[0];
  const newDeck = localDeck.slice(1);
  return [drawnCard, newDeck];
};
