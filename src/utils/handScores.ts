import { Card, Rank, HandRank, Suit, suits } from "types/cards";

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
    return {
      rankName: "Straight Flush",
      rank: 800,
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
    return {
      rankName: "Four Of A Kind",
      rank: 700,
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
    return {
      rankName: "Full House",
      rank: 600,
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
    return {
      rankName: "Flush",
      rank: 500,
      cards,
    };
  } else {
    throw new Error("Invalid input: A flush must contain exactly 5 cards.");
  }
};

// Straight - 400 - 500
export const getStraightScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    return {
      rankName: "Straight",
      rank: 400,
      cards,
    };
  } else {
    throw new Error("Invalid input: A straight must contain exactly 5 cards.");
  }
};

// Three of a kind - 300 - 400
export const getThreeOfAKindScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    return {
      rankName: "Three Of A Kind",
      rank: 300,
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
    return {
      rankName: "Two Pair",
      rank: 200,
      cards,
    };
  } else {
    throw new Error("Invalid input: A two pair must contain exactly 5 cards.");
  }
};

// One pair - 100 - 200
export const getOnePairScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    return {
      rankName: "One Pair",
      rank: 100,
      cards,
    };
  } else {
    throw new Error("Invalid input: A one pair must contain exactly 5 cards.");
  }
};

// High card - 0 - 100
export const getHighCardScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    return {
      rankName: "High Card",
      rank: 0,
      cards,
    };
  } else {
    throw new Error("Invalid input: A high card must contain exactly 5 cards.");
  }
};
