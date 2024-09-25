import { Card, Rank, suits } from "types/cards";
import {
  countRanks,
  findNOfAKind,
  isSequential,
  sortCardsByRank,
} from "./helpers";

// Royal flush - 900
export const isRoyalFlush = (cards: Card[]): Card[] | null => {
  const royalFlushRanks: Rank[] = ["10", "11", "12", "13", "14"];
  for (const suit of suits) {
    const suitCards = cards.filter((card) => card.suit === suit);
    const sortedSuitCards = sortCardsByRank(suitCards);
    const suitCardRanks = sortedSuitCards.map((card) => card.rank);

    if (royalFlushRanks.every((rank) => suitCardRanks.includes(rank))) {
      return sortedSuitCards.filter((card) =>
        royalFlushRanks.includes(card.rank)
      );
    }
  }
  return null;
};

// Straight flush - 800 - 900
export const isStraightFlush = (cards: Card[]): Card[] | null => {
  for (const suit of suits) {
    const suitCards = cards.filter((card) => card.suit === suit);
    if (suitCards.length >= 5) {
      // Sort suit cards by rank in descending order
      const sortedSuitCards = sortCardsByRank(suitCards);
      let suitCardRanks = sortedSuitCards.map((card) => parseInt(card.rank));

      // Remove duplicate ranks
      suitCardRanks = [...new Set(suitCardRanks)];

      // Check for a sequential straight flush
      for (let i = 0; i <= suitCardRanks.length - 5; i++) {
        if (isSequential(suitCardRanks.slice(i, i + 5))) {
          // Return the best straight flush (top 5 cards)
          return sortedSuitCards.filter((card) =>
            suitCardRanks.slice(i, i + 5).includes(parseInt(card.rank))
          );
        }
      }

      // Special case for A-2-3-4-5 straight flush
      if (suitCardRanks.includes(14) && isSequential([5, 4, 3, 2, 1])) {
        return sortedSuitCards.filter((card) =>
          ["14", "2", "3", "4", "5"].includes(card.rank)
        );
      }
    }
  }

  return null;
};

// Four of a kind - 700 - 800
export const isFourOfAKind = (cards: Card[]): Card[] | null => {
  const fourOfAKindCards = findNOfAKind(cards, 4);
  if (fourOfAKindCards) {
    const kicker = sortCardsByRank(
      cards.filter((card) => card.rank !== fourOfAKindCards[0].rank)
    )[0]; // Highest kicker
    return [...fourOfAKindCards, kicker];
  }
  return null;
};

// Full house - 600 - 700
export const isFullHouse = (cards: Card[]): Card[] | null => {
  const valueCount = countRanks(cards);
  const threeOfAKind = findNOfAKind(cards, 3);
  const pairs = Object.keys(valueCount)
    .filter((rank) => valueCount[rank] === 2)
    .map((rank) => rank);

  if (threeOfAKind && pairs.length > 0) {
    const pair = cards.filter((card) => card.rank === pairs[0]).slice(0, 2); // Only take the pair
    return [...threeOfAKind, ...pair];
  }

  return null;
};

// Flush - 500 - 600
export const isFlush = (cards: Card[]): Card[] | null => {
  for (const suit of suits) {
    const suitCards = cards.filter((card) => card.suit === suit);
    if (suitCards.length >= 5) {
      return sortCardsByRank(suitCards).slice(0, 5); // Top 5 cards
    }
  }
  return null;
};

// Straight - 400 - 500
export const isStraight = (cards: Card[]): Card[] | null => {
  let values = cards.map((card) => parseInt(card.rank)).sort((a, b) => b - a);
  values = [...new Set(values)];

  for (let i = 0; i <= values.length - 5; i++) {
    if (isSequential(values.slice(i, i + 5))) {
      const neededValues = values.slice(i, i + 5);
      const usedRanks = new Set();

      return cards.filter((card) => {
        const cardRank = parseInt(card.rank);
        if (neededValues.includes(cardRank) && !usedRanks.has(cardRank)) {
          usedRanks.add(cardRank);
          return true;
        }
        return false;
      });
    }
  }

  if (isSequential([14, 5, 4, 3, 2])) {
    const usedRanks = new Set();
    return cards.filter((card) => {
      const cardRank = parseInt(card.rank);
      if ([14, 5, 4, 3, 2].includes(cardRank) && !usedRanks.has(cardRank)) {
        usedRanks.add(cardRank);
        return true;
      }
      return false;
    });
  }

  return null;
};

// Three of a kind - 300 - 400
export const isThreeOfAKind = (cards: Card[]): Card[] | null => {
  const threeOfAKindCards = findNOfAKind(cards, 3);
  if (threeOfAKindCards) {
    const kickers = sortCardsByRank(
      cards.filter((card) => card.rank !== threeOfAKindCards[0].rank)
    ).slice(0, 2); // Two highest kickers
    return [...threeOfAKindCards, ...kickers];
  }
  return null;
};

// Two pair - 200 - 300
export const isTwoPair = (cards: Card[]): Card[] | null => {
  const valueCount = countRanks(cards);
  const pairs = Object.keys(valueCount).filter(
    (rank) => valueCount[rank] === 2
  );

  if (pairs.length >= 2) {
    const sortedPairs = pairs.sort((a, b) => parseInt(b) - parseInt(a));
    const firstPair = cards.filter((card) => card.rank === sortedPairs[0]);
    const secondPair = cards.filter((card) => card.rank === sortedPairs[1]);
    const kicker = sortCardsByRank(
      cards.filter(
        (card) => card.rank !== sortedPairs[0] && card.rank !== sortedPairs[1]
      )
    )[0]; // Highest kicker
    return [...firstPair, ...secondPair, kicker];
  }

  return null;
};

// One pair - 100 - 200
export const isOnePair = (cards: Card[]): Card[] | null => {
  const onePairCards = findNOfAKind(cards, 2);
  if (onePairCards) {
    const kickers = sortCardsByRank(
      cards.filter((card) => card.rank !== onePairCards[0].rank)
    ).slice(0, 3); // Three highest kickers
    return [...onePairCards, ...kickers];
  }
  return null;
};
