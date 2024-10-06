import { Card, HandRank } from "../types/cards";
import {
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isOnePair,
  isRoyalFlush,
  isStraight,
  isStraightFlush,
  isThreeOfAKind,
  isTwoPair,
} from "./handRanks";
import {
  getFlushScore,
  getFourOfAKindScore,
  getFullHouseScore,
  getHighCardScore,
  getOnePairScore,
  getRoyalFlushScore,
  getStraightFlushScore,
  getStraightScore,
  getThreeOfAKindScore,
  getTwoPairScore,
} from "./handScores";
import { sortCardsByRank } from "./helpers";

// Function to evaluate the player's starting hand as good, medium, or bad
export const evaluatePlayerHand = (
  hand: Card[]
): "veryGood" | "good" | "medium" | "bad" => {
  if (hand.length !== 2) {
    throw new Error("Starting hand must contain exactly 2 cards.");
  }

  const card1 = hand[0];
  const card2 = hand[1];

  const rank1 = card1.rank;
  const rank2 = card2.rank;
  const isSuited = card1.suit === card2.suit;

  // Convert face cards to numbers for easier comparison
  const rankOrder: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13,
    "14": 14,
  };

  const higherRank = Math.max(rankOrder[rank1], rankOrder[rank2]);
  const lowerRank = Math.min(rankOrder[rank1], rankOrder[rank2]);

  // Define all possible hand rankings from the chart
  const veryGoodHands = [
    [14, 14],
    [13, 13],
    [12, 12],
    [11, 11],
    [10, 10],
    [9, 9],
    [8, 8],
    [7, 7],
    [14, 13],
    [14, 12],
    [14, 11],
    [14, 10],
    [13, 12],
    [13, 11],
    [13, 10],
    [12, 11],
    [12, 10],
    [11, 10],
    [11, 9],
    [10, 9],
  ];

  const goodHands = [
    [6, 6],
    [5, 5],
    [14, 9],
    [14, 8],
    [14, 7],
    [14, 6],
    [13, 9],
    [12, 9],
    [12, 8],
    [11, 8],
    [10, 8],
    [9, 8],
  ];

  const mediumHands = [
    [4, 4],
    [3, 3],
    [2, 2],
    [14, 5],
    [14, 4],
    [14, 3],
    [14, 2],
    [13, 8],
    [13, 7],
    [13, 6],
    [13, 5],
    [13, 4],
    [13, 3],
    [13, 2],
    [11, 7],
    [10, 7],
    [9, 7],
    [9, 6],
    [8, 7],
    [8, 6],
    [7, 6],
    [7, 5],
    [6, 5],
    [5, 4],
  ];

  // Check for suited hands from the chart
  if (isSuited) {
    if (
      veryGoodHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      )
    ) {
      return "veryGood";
    }
    if (
      goodHands.some((hand) => hand[0] === higherRank && hand[1] === lowerRank)
    ) {
      return "good";
    }
    if (
      mediumHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      )
    ) {
      return "medium";
    }
  } else {
    // Non-suited hand logic
    const nonSuitedVeryGoodHands = [
      [14, 13],
      [14, 12],
      [13, 12],
    ];
    const nonSuitedGoodHands = [
      [11, 10],
      [10, 9],
    ];

    if (
      veryGoodHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      ) ||
      nonSuitedVeryGoodHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      )
    ) {
      return "veryGood";
    }
    if (
      goodHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      ) ||
      nonSuitedGoodHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      )
    ) {
      return "good";
    }
    if (
      mediumHands.some(
        (hand) => hand[0] === higherRank && hand[1] === lowerRank
      )
    ) {
      return "medium";
    }
  }

  // Default to "bad" if the hand doesn't match any category
  return "bad";
};

export const evaluateHand = (cards: Card[]): HandRank => {
  // Check for Royal Flush
  const royalFlush = isRoyalFlush(cards);
  if (royalFlush) {
    return getRoyalFlushScore(royalFlush);
  }

  // Check for Straight Flush
  const straightFlush = isStraightFlush(cards);
  if (straightFlush) {
    return getStraightFlushScore(straightFlush);
  }

  // Check for Four of a Kind
  const fourOfAKind = isFourOfAKind(cards);
  if (fourOfAKind) {
    return getFourOfAKindScore(fourOfAKind);
  }

  // Check for Full House
  const fullHouse = isFullHouse(cards);
  if (fullHouse) {
    return getFullHouseScore(fullHouse);
  }

  // Check for Flush
  const flush = isFlush(cards);
  if (flush) {
    return getFlushScore(flush);
  }

  // Check for Straight
  const straight = isStraight(cards);
  if (straight) {
    return getStraightScore(straight);
  }

  // Check for Three of a Kind
  const threeOfAKind = isThreeOfAKind(cards);
  if (threeOfAKind) {
    return getThreeOfAKindScore(threeOfAKind);
  }

  // Check for Two Pair
  const twoPair = isTwoPair(cards);
  if (twoPair) {
    return getTwoPairScore(twoPair);
  }

  // Check for One Pair
  const onePair = isOnePair(cards);
  if (onePair) {
    return getOnePairScore(onePair);
  }

  // If no other hand is found, return High Card
  const highCard = sortCardsByRank(cards).slice(0, 5); // Highest 5 cards
  return getHighCardScore(highCard);
};

export const evaluateBestHand = (
  playerHand: Card[],
  communityCards: Card[]
): HandRank => {
  const allCards = [...playerHand, ...communityCards];

  // Evaluate and return the best possible hand
  return evaluateHand(allCards);
};
