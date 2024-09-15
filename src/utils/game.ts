import { Card, HandRank } from "types/cards";
import {
  isRoyalFlush,
  isStraightFlush,
  isFourOfAKind,
  isFullHouse,
  isFlush,
  isStraight,
  isThreeOfAKind,
  isTwoPair,
  isOnePair,
} from "./handRanks";
import {
  getRoyalFlushScore,
  getStraightFlushScore,
  getFourOfAKindScore,
  getFullHouseScore,
  getFlushScore,
  getStraightScore,
  getThreeOfAKindScore,
  getTwoPairScore,
  getOnePairScore,
  getHighCardScore,
} from "./handScores";
import { sortCardsByRank } from "./helpers";

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
