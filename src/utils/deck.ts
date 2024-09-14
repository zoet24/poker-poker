// Define the possible suits and ranks
export const suits = ["spade", "heart", "diamond", "club"] as const;

export const suitSymbols = {
  spade: "\u2660", // ♠
  heart: "\u2665", // ♥
  diamond: "\u2666", // ♦
  club: "\u2663", // ♣
} as const;

export const suitColours = {
  spade: "black",
  heart: "red",
  diamond: "red",
  club: "black",
} as const;

export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11", // J
  "12", // Q
  "13", // K
  "14", // A
] as const;

// Define the type for a Card, combining rank and suit
export interface Card {
  rank: (typeof ranks)[number]; // One of the ranks
  suit: (typeof suits)[number]; // One of the suits
}

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

// Optional: Function to shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck]; // Create a copy of the deck to shuffle
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap elements
  }
  return shuffledDeck;
};
