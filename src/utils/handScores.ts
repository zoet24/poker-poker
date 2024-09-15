import { Card, Rank, HandRank, Suit, suits } from "types/cards";

// Royal flush - 900
export const getRoyalFlushScore = (
  cards: Card[]
): { rankName: string; score: number } => {
  if (cards.length === 5) {
    return {
      rankName: "Royal Flush",
      score: 900,
    };
  } else {
    throw new Error(
      "Invalid input: A royal flush must contain exactly 5 cards."
    );
  }
};

// Straight flush - 800 - 900
// export const getStraightFlushScore = (
//   cards: Card[]
// ): { rankName: string; score: number } => {

// };
