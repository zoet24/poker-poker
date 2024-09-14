import { Card } from "./cards";

export interface Player {
  name: string;
  money: number;
  hand: Card[];
  showCards: boolean;
}

export interface PlayerBasicInfo {
  name: string;
  money: number;
}

export interface PlayerHandInfo {
  hand: Card[];
  showCards: boolean;
}
