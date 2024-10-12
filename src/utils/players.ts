import { Player } from "../types/players";

// Define the initial players array
const initialPlayerMoney = 5;
export const initialPlayers: Player[] = [
  {
    name: "A",
    money: initialPlayerMoney,
    currentBet: 0,
    hand: [],
    bestHand: null,
    showCards: true,
    isComp: false,
    hasFolded: false,
    role: {
      isDealer: true,
      isSmallBlind: false,
      isBigBlind: false,
    },
  },
  {
    name: "B",
    money: initialPlayerMoney,
    currentBet: 0,
    hand: [],
    bestHand: null,
    showCards: false,
    isComp: true,
    hasFolded: false,
    role: {
      isDealer: false,
      isSmallBlind: true,
      isBigBlind: false,
    },
  },
  {
    name: "C",
    money: initialPlayerMoney,
    currentBet: 0,
    hand: [],
    bestHand: null,
    showCards: false,
    isComp: true,
    hasFolded: false,
    role: {
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: true,
    },
  },
  {
    name: "D",
    money: initialPlayerMoney,
    currentBet: 0,
    hand: [],
    bestHand: null,
    showCards: false,
    isComp: true,
    hasFolded: false,
    role: {
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
    },
  },
  {
    name: "E",
    money: initialPlayerMoney,
    currentBet: 0,
    hand: [],
    bestHand: null,
    showCards: false,
    isComp: true,
    hasFolded: false,
    role: {
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
    },
  },
];

export const createNewPlayer = (name: string): Player => ({
  name,
  money: initialPlayerMoney,
  currentBet: 0,
  hand: [],
  bestHand: null,
  showCards: false,
  isComp: true,
  hasFolded: false,
  role: {
    isDealer: false,
    isBigBlind: false,
    isSmallBlind: false,
  },
});

export const rotateRoles = (
  players: Player[],
  addingOrRemovingPlayers: boolean = false
): Player[] => {
  const numPlayers = players.length;

  if (numPlayers === 0 || numPlayers === 1) {
    return players;
  }

  const currentDealerIndex = players.findIndex(
    (player) => player.role.isDealer
  );

  let newDealerIndex: number;
  if (addingOrRemovingPlayers && currentDealerIndex !== -1) {
    newDealerIndex = currentDealerIndex; // Dealer stays the same
  } else {
    newDealerIndex = (currentDealerIndex + 1) % players.length;
  }

  const newSmallBlindIndex = (newDealerIndex + 1) % players.length;
  const newBigBlindIndex = (newSmallBlindIndex + 1) % players.length;

  return players.map((player, index) => ({
    ...player,
    role: {
      isDealer: index === newDealerIndex,
      isSmallBlind: index === newSmallBlindIndex,
      isBigBlind: numPlayers === 2 ? false : index === newBigBlindIndex,
    },
  }));
};
