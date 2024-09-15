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

export const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
export const ranks: Rank[] = [
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

export interface Card {
  rank: Rank;
  suit: Suit;
}

export const suitSymbols = {
  spades: "\u2660", // ♠
  hearts: "\u2665", // ♥
  diamonds: "\u2666", // ♦
  clubs: "\u2663", // ♣
} as const;

export const suitColors = {
  spades: "black",
  hearts: "red",
  diamonds: "red",
  clubs: "black",
} as const;

export interface HandRank {
  rankName: string;
  rank: number;
  cards: Card[];
}
