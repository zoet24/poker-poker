import { Card, HandRank } from "types/cards";
import {
  calculateRankContribution,
  countRanks,
  getPairsAndKickers,
  sortCardsByRank,
} from "./helpers";

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
    let score = 800;

    const sortedCards = sortCardsByRank(cards);
    const highestCard = parseInt(sortedCards[0].rank);
    score = highestCard === 14 ? score : score + ((highestCard - 5) / 9) * 99;

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
    let score = 700;

    const { pairs: fourOfAKindCards, kickers } = getPairsAndKickers(cards, 4);
    const kicker = kickers[0];
    score =
      score +
      calculateRankContribution(parseInt(fourOfAKindCards[0].rank), 99, 1) +
      calculateRankContribution(parseInt(kicker.rank), 99, 14) -
      10; // -10 to keep score within 700 - 799

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

// Full house - 600 - 700 - come back to!
export const getFullHouseScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 600;

    const valueCount = countRanks(cards);
    let threeOfAKindCards: Card[] = [];
    let pairCards: Card[] = [];

    // Loop through the value counts to find three-of-a-kind and pair
    for (const rank in valueCount) {
      if (valueCount[rank] === 3) {
        threeOfAKindCards = cards.filter((card) => card.rank === rank);
      } else if (valueCount[rank] === 2) {
        pairCards = cards.filter((card) => card.rank === rank);
      }
    }

    score += calculateRankContribution(
      parseInt(threeOfAKindCards[0].rank),
      99,
      1
    );
    score +=
      calculateRankContribution(parseInt(pairCards[0].rank), 99, 14) - 10; // -10 to keep score within 600 - 699

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

    const sortedCards = sortCardsByRank(cards);
    sortedCards.forEach(
      (card, i) =>
        (score += calculateRankContribution(
          parseInt(card.rank),
          99,
          Math.pow(2, i + 1)
        ))
    );

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

    const sortedCards = sortCardsByRank(cards);
    const isWheelStraight = sortedCards.every(
      (card, index) => ["14", "5", "4", "3", "2"][index] === card.rank
    );
    const highestCard = parseInt(sortedCards[0].rank);
    score = isWheelStraight ? score : score + ((highestCard - 5) / 9) * 99;

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
    let threeOfAKindRank: number = 0;
    let kickers: Card[] = [];

    const valueCount = countRanks(cards);

    for (const rank in valueCount) {
      if (valueCount[rank] === 3) {
        threeOfAKindRank = parseInt(rank); // This is the rank of the three of a kind
      } else if (valueCount[rank] === 1) {
        // Find the single cards for the kickers
        kickers.push(...cards.filter((card) => card.rank === rank));
      }
    }

    kickers = sortCardsByRank(kickers);

    const threeOfAKindScore = 300 + (threeOfAKindRank / 14) * 99;

    score =
      threeOfAKindScore +
      (parseInt(kickers[0].rank) / 14) * (99 / 14) +
      (parseInt(kickers[1].rank) / 14) * (99 / 28) -
      10; // Corrective -10 to keep range in between 300 and 399

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
    let firstPairRank: number = 0;
    let secondPairRank: number = 0;
    let kicker: Card | null = null;

    const valueCount = countRanks(cards);

    const pairs: Card[] = [];

    // Identify pairs and the kicker
    for (const rank in valueCount) {
      if (valueCount[rank] === 2) {
        // Found a pair, push the cards into the pairs array
        pairs.push(...cards.filter((card) => card.rank === rank));

        // Assign the pair rank values
        if (!firstPairRank) {
          firstPairRank = parseInt(rank);
        } else if (!secondPairRank) {
          secondPairRank = parseInt(rank);
        }
      } else if (valueCount[rank] === 1) {
        // The remaining card is the kicker
        kicker = cards.find((card) => card.rank === rank) || null;
      }
    }

    if (!firstPairRank || !secondPairRank || !kicker) {
      throw new Error(
        "Invalid hand: Two Pair must consist of two pairs and one kicker."
      );
    }

    // Sort pairs by rank in descending order
    pairs.sort((a, b) => parseInt(b.rank) - parseInt(a.rank));

    // Calculate score based on the pairs
    const pairScore =
      (firstPairRank / 14) * 99 + (secondPairRank / 14) * (99 / 14);

    // Include the kicker in the score
    score = 200 + pairScore + (parseInt(kicker.rank) / 14) * (99 / 28) - 10;

    return {
      rankName: "Two Pair",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A two pair hand must contain exactly 5 cards."
    );
  }
};

// One pair - 100 - 200
export const getOnePairScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 100;
    let pairRank: number = 0;
    let kickers: Card[] = [];

    const valueCount = countRanks(cards);

    // Identify the pair and the kickers
    for (const rank in valueCount) {
      if (valueCount[rank] === 2) {
        pairRank = parseInt(rank); // This is the rank of the pair
      } else if (valueCount[rank] === 1) {
        // Find the single cards for the kickers
        kickers.push(...cards.filter((card) => card.rank === rank));
      }
    }

    if (!pairRank || kickers.length < 3) {
      throw new Error(
        "Invalid hand: One Pair must consist of one pair and three kickers."
      );
    }

    // Sort kickers by rank in descending order
    kickers = sortCardsByRank(kickers);

    // Calculate the score based on the pair and the kickers
    const pairScore = (pairRank / 14) * 99;

    score =
      100 +
      pairScore +
      (parseInt(kickers[0].rank) / 14) * (99 / 14) +
      (parseInt(kickers[1].rank) / 14) * (99 / 28) +
      (parseInt(kickers[2].rank) / 14) * (99 / 56) -
      10; // Corrective -10 to keep the range between 100 - 199

    return {
      rankName: "One Pair",
      rank: score,
      cards,
    };
  } else {
    throw new Error(
      "Invalid input: A one pair hand must contain exactly 5 cards."
    );
  }
};

// High card - 0 - 100
export const getHighCardScore = (cards: Card[]): HandRank => {
  if (cards.length === 5) {
    let score = 0;

    const sortedCards = sortCardsByRank(cards);

    const maxContribution = 100; // Corrective 100 to keep range in between 0 and 99

    for (let i = 0; i < sortedCards.length; i++) {
      score +=
        (parseInt(sortedCards[i].rank) / 14) *
        (maxContribution / Math.pow(2, i + 1));
    }

    return {
      rankName: "High Card",
      rank: score,
      cards,
    };
  } else {
    throw new Error("Invalid input: A high card must contain exactly 5 cards.");
  }
};
