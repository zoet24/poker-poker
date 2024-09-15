import { Card, Rank, HandRank, Suit, suits } from "types/cards";

// Royal flush - 900
export const isRoyalFlush = (cards: Card[]): false | HandRank => {
  const suits = new Set(cards.map((card) => card.suit));
  const royalFlushRanks: Rank[] = ["10", "11", "12", "13", "14"];

  for (const suit of suits) {
    const suitCards = cards.filter((card) => card.suit === suit);
    const suitCardValues = suitCards.map((card) => card.rank);

    if (royalFlushRanks.every((rank) => suitCardValues.includes(rank))) {
      const hand = suitCards.filter((card) =>
        royalFlushRanks.includes(card.rank)
      ); // Only keep the royal flush cards
      return {
        rankName: "Royal Flush",
        rank: 900,
        cards: hand,
      };
    }
  }

  return false; // Not a royal flush
};

// Straight flush - 800 - 900
export const isStraightFlush = (cards: Card[]): HandRank | null => {
  let bestStraightFlush: HandRank | null = null;

  // Iterate through all suits
  for (const suit of suits) {
    const suitCards = cards.filter((card) => card.suit === suit);

    // Check if there are enough cards for a straight flush
    if (suitCards.length >= 5) {
      suitCards.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));

      let counter = 1;
      let straightFlushCards = [suitCards[0]];

      for (let i = 0; i < suitCards.length - 1; i++) {
        if (
          parseInt(suitCards[i].rank) + 1 ===
          parseInt(suitCards[i + 1].rank)
        ) {
          counter++;
          straightFlushCards.push(suitCards[i + 1]);

          if (counter >= 5) {
            const currentRank =
              800 + (parseInt(suitCards[i + 1].rank) / 14) * 99;

            if (!bestStraightFlush || currentRank > bestStraightFlush.rank) {
              bestStraightFlush = {
                rankName: "Straight Flush",
                rank: currentRank,
                cards: straightFlushCards.slice(-5),
              };
            }
          }
        } else {
          counter = 1;
          straightFlushCards = [suitCards[i + 1]];
        }
      }

      // Special case for wheel straight flush (A-2-3-4-5)
      const values = suitCards.map((card) => parseInt(card.rank));
      if (
        values.includes(14) &&
        values.includes(2) &&
        values.includes(3) &&
        values.includes(4) &&
        values.includes(5)
      ) {
        const lowStraight = suitCards.filter((card) =>
          ["14", "2", "3", "4", "5"].includes(card.rank)
        );
        const currentRank = 800 + (5 / 14) * 99;
        if (!bestStraightFlush || currentRank > bestStraightFlush.rank) {
          bestStraightFlush = {
            rankName: "Straight Flush",
            rank: currentRank,
            cards: lowStraight,
          };
        }
      }
    }
  }

  return bestStraightFlush;
};
