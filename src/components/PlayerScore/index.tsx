// Display for player score

import Card from "../Card";
import { HandRank } from "types/cards";

interface PlayerScoreProps {
  bestHand: HandRank | null;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ bestHand }) => {
  const handToDisplay = bestHand
    ? [
        ...bestHand.cards,
        ...Array(5 - bestHand.cards.length).fill(undefined),
      ].slice(0, 5)
    : Array(5).fill(undefined);

  return (
    <div className="text-center">
      <span>
        {bestHand?.rankName} ({bestHand?.rank})
      </span>
      <div className="flex space-x-1 mt-1">
        {handToDisplay.map((card, index) => (
          <Card key={index} card={card} size="square" />
        ))}
      </div>
    </div>
  );
};

export default PlayerScore;
