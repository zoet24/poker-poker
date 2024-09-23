// Display for player score

import Card from "../Card";
import { HandRank } from "types/cards";

interface PlayerScoreProps {
  showCards: boolean;
  bestHand: HandRank | null;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ showCards, bestHand }) => {
  const handToDisplay = bestHand
    ? [
        ...bestHand.cards,
        ...Array(5 - bestHand.cards.length).fill(undefined),
      ].slice(0, 5)
    : Array(5).fill(undefined);

  return (
    <div className="text-center max-w-[136px] truncate">
      {bestHand && showCards ? (
        <span className="whitespace-nowrap ">
          {bestHand?.rank.toFixed(2)}: {bestHand?.rankName}
        </span>
      ) : (
        <span>---</span>
      )}
      <div className="flex space-x-1 mt-1">
        {handToDisplay.map((card, index) => (
          <Card key={index} card={card} size="square" showCard={showCards} />
        ))}
      </div>
    </div>
  );
};

export default PlayerScore;
