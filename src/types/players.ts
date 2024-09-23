import { Card, HandRank } from "./cards";

export interface Player {
  name: string;
  money: number;
  hand: Card[];
  bestHand?: HandRank | null;
  showCards: boolean;
  isComp: boolean;
  role: {
    isDealer: boolean;
    isBigBlind: boolean;
    isSmallBlind: boolean;
  };
}

export interface PlayerBasicInfo {
  name: string;
  money: number;
  showCards: boolean;
  role: {
    isDealer: boolean;
    isBigBlind: boolean;
    isSmallBlind: boolean;
  };
}

export interface PlayerHandInfo {
  hand: Card[];
  showCards: boolean;
}

export interface PlayerBestHandInfo {}
