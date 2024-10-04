import { GameStage } from "../types/stage";

// Build up tips from BlackRain69
export const tips: Record<GameStage, string[]> = {
  "pre-deal": [
    "Get ready! Review your cards and plan your bets.",
    "Remember to observe the other players' actions closely!",
    "Make sure you understand the starting positions and roles before the deal.",
  ],
  deal: [
    "All players receive their initial two cards. Time to consider your starting hand.",
    "Look at your cards and think about their potential with the community cards.",
    "Are your cards suited or connected? Think about potential combinations.",
  ],
  flop: [
    "Three community cards are revealed. Evaluate your hand strength.",
    "Think about possible draws, like straight or flush draws.",
    "Observe the flop to see if it matches your cards.",
  ],
  turn: [
    "One more community card is added. Consider if you want to raise, check, or fold.",
    "The turn card often determines whether to proceed aggressively or cautiously.",
    "Use the turn card to reassess your chances against other potential hands.",
  ],
  river: [
    "The final community card is revealed. Assess your best possible hand.",
    "It's the last card! Time to evaluate your final hand and plan your next move.",
    "Do you have the nuts, or should you prepare to fold? Think carefully!",
  ],
  showdown: [
    "Show your cards! Let’s see who has the best hand.",
    "Compare your final hand to the others and see if you’ve won.",
    "It’s time to reveal your cards—may the best hand win!",
  ],
};
