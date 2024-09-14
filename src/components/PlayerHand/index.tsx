import Card from "../Card";
import { Card as CardProps } from "../../types/cards";
import { PlayerHandInfo } from "types/players";

// Display for player hand

const PlayerHand: React.FC<PlayerHandInfo> = ({ hand, showCards }) => {
  const handToDisplay = [
    ...hand,
    ...Array(2 - hand.length).fill(undefined),
  ].slice(0, 2);

  return (
    <div className="flex space-x-1">
      {handToDisplay.map((card, index) => (
        <Card key={index} card={card} showCard={showCards} />
      ))}
    </div>
  );
};

export default PlayerHand;
