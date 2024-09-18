import { Card, HandRank } from "./cards";

export interface Player {
  name: string;
  money: number;
  hand: Card[];
  bestHand?: HandRank | null;
  showCards: boolean;
}

export interface PlayerBasicInfo {
  name: string;
  money: number;
  showCards: boolean;
}

export interface PlayerHandInfo {
  hand: Card[];
  showCards: boolean;
}

export interface PlayerBestHandInfo {}
