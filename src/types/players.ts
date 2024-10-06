import { Card, HandRank } from "./cards";

export interface Player {
  name: string;
  money: number;
  hand: Card[];
  bestHand?: HandRank | null;
  showCards: boolean;
  isComp: boolean;
  hasFolded: boolean;
  role: {
    isDealer: boolean;
    isSmallBlind: boolean;
    isBigBlind: boolean;
  };
}

export interface PlayerHand {
  hand: Card[];
  showCards: boolean;
}
