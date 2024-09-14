import { Card } from "./cards";

export interface Player {
  name: string;
  money: number;
  hand: Card[];
}
