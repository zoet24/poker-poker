import { Card, Rank, HandRank, Suit, suits } from "types/cards";
import { countRanks, sortCardsByRank } from "./helpers";

// Royal flush - 900
export const getRoyalFlushScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    return {
      rankName: "Royal Flush",
      rank: 900,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A royal flush must contain exactly 5 cards."
    );
  }
};

// Straight flush - 800 - 900
export const getStraightFlushScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    // Sort the cards by rank (descending) to get the highest card first
    const sortedCards = sortCardsByRank(cards);
    const highestCard = parseInt(sortedCards[0].rank); // Highest card in the straight flush

    // If the highest card is an Ace, assign it a score of 800 for a wheel straight
    let score = 800;
    if (highestCard !== 14) {
      // Calculate rank between 800 and 899 based on the highest card (A-2-3-4-5 = 800, 9-10-J-Q-K = 899)
      score = 800 + ((highestCard - 5) / 9) * 99;
    }

    return {
      rankName: "Straight Flush",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A straight flush must contain exactly 5 cards."
    );
  }
};

// Four of a kind - 700 - 800
export const getFourOfAKindScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    // Set variables to lowest four of a kind score
    let score = 700;
    let fourOfAKindRank: number = 2;
    let kicker: number = 3;

    // Count occurrences of each rank
    const valueCount = countRanks(cards);

    for (const rank in valueCount) {
      if (valueCount[rank] === 4) {
        fourOfAKindRank = parseInt(rank); // This is the rank of the four of a kind
      } else if (valueCount[rank] === 1) {
        kicker = parseInt(rank); // This is the kicker
      }
    }

    // Calculate score for Four of a Kind (between 700 and 799)
    const baseScore = 700 + (fourOfAKindRank / 14) * 99 - 10; // Corrective - 10 to keep range in between 700 and 799
    score = baseScore + (kicker / 14) * (99 / 14);

    return {
      rankName: "Four Of A Kind",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A four of a kind must contain exactly 5 cards."
    );
  }
};

// Full house - 600 - 700
export const getFullHouseScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 600;

    return {
      rankName: "Full House",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A full house must contain exactly 5 cards."
    );
  }
};

// Flush - 500 - 600
export const getFlushScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 500;

    return {
      rankName: "Flush",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A flush must contain exactly 5 cards.");
  }
};

// Straight - 400 - 500
export const getStraightScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 400;

    return {
      rankName: "Straight",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A straight must contain exactly 5 cards.");
  }
};

// Three of a kind - 300 - 400
export const getThreeOfAKindScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 300;

    return {
      rankName: "Three Of A Kind",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A three of a kind must contain exactly 5 cards."
    );
  }
};

// Two pair - 200 - 300
export const getTwoPairScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 200;

    return {
      rankName: "Two Pair",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A two pair must contain exactly 5 cards.");
  }
};

// One pair - 100 - 200
export const getOnePairScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 100;

    return {
      rankName: "One Pair",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A one pair must contain exactly 5 cards.");
  }
};

// High card - 0 - 100
export const getHighCardScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 0;

    return {
      rankName: "High Card",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A high card must contain exactly 5 cards.");
  }
};
