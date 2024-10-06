import { Card, ranks, suits } from "../types/cards";

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

// Function to shuffle deck
export const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Function to draw card from deck
export const drawCardFromDeck = (localDeck: Card[]): [Card | null, Card[]] => {
  if (localDeck.length === 0) {
    throw new Error("Deck is empty");
  }
  const drawnCard = localDeck[0];
  const newDeck = localDeck.slice(1);
  return [drawnCard, newDeck];
};

// Function to burn a card
export const burnCard = (
  localDeck: Card[],
  addToBurn: (card: Card) => void
): Card[] => {
  const [burnedCard, newLocalDeck] = drawCardFromDeck(localDeck);
  if (burnedCard) {
    addToBurn(burnedCard);
  }
  return newLocalDeck;
};

// Function to deal a card to the community cards
export const dealToCommunity = (
  numberOfCards: number,
  localDeck: Card[],
  addToCommunity: (cards: Card[]) => void
): Card[] => {
  const communityCards: Card[] = [];
  let updatedDeck = localDeck;
  for (let i = 0; i < numberOfCards; i++) {
    const [card, newLocalDeck] = drawCardFromDeck(updatedDeck);
    updatedDeck = newLocalDeck;
    if (card) {
      communityCards.push(card);
    }
  }
  addToCommunity(communityCards);
  return updatedDeck;
};

export const getCardDisplayValue = (rank: Card["rank"]): string => {
  switch (rank) {
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    case "14":
      return "A";
    default:
      return rank;
  }
};

// Insert the selected card at the specified index
export const reorderDeck = (
  deck: Card[],
  selectedCard: Card,
  deckIndex: number
): Card[] => {
  // Filter out the selected card from the deck
  const filteredDeck = deck.filter(
    (card) =>
      !(card.rank === selectedCard.rank && card.suit === selectedCard.suit)
  );

  const updatedDeck = [
    ...filteredDeck.slice(0, deckIndex), // Cards before the index
    selectedCard, // Insert selected card
    ...filteredDeck.slice(deckIndex), // Cards after the index
  ];

  return updatedDeck;
};
