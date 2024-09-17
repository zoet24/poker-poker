import { evaluatePlayerHand } from "../../utils/game";
import Card from "../Card";
import { PlayerHandInfo } from "types/players";

// Display for player hand

const PlayerHand: React.FC<PlayerHandInfo> = ({ hand, showCards }) => {
  const handToDisplay = [
    ...hand,
    ...Array(2 - hand.length).fill(undefined),
  ].slice(0, 2);

  let handClass = "";

  if (hand.length === 2 && showCards) {
    handClass = `hand hand--${evaluatePlayerHand(hand)}`;
  }

  return (
    <div className="flex space-x-1">
      {handToDisplay.map((card, index) => (
        <div className={handClass}>
          <Card key={index} card={card} showCard={showCards} />
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;
