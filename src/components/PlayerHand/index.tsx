import { PlayerHand as PlayerHandType } from "../../types/players";
import { evaluatePlayerHand } from "../../utils/hands";
import Card from "../Card";

interface PlayerHandProps extends PlayerHandType {
  playerIndex: number;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  hand,
  showCards,
  playerIndex,
}) => {
  const handToDisplay = [
    ...hand,
    ...Array(2 - hand.length).fill(undefined),
  ].slice(0, 2);

  let handClass = "";

  if (hand.length === 2 && showCards) {
    handClass = `player-hand player-hand--${evaluatePlayerHand(hand)}`;
  }

  return (
    <div className="flex space-x-1">
      {handToDisplay.map((card, index) => {
        const deckIndex = playerIndex * 2 + index;
        return (
          <div key={index} className={handClass}>
            <Card card={card} showCard={showCards} deckIndex={deckIndex} />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerHand;
