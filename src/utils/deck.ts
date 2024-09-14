// export const suitSymbols = {
//   spade: "\u2660", // ♠
//   heart: "\u2665", // ♥
//   diamond: "\u2666", // ♦
//   club: "\u2663", // ♣
// } as const;

// export const suitColours = {
//   spade: "black",
//   heart: "red",
//   diamond: "red",
//   club: "black",
// } as const;

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export interface Card {
  rank: Rank;
  suit: Suit;
}

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

export const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
