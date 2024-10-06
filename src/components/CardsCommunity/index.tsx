import { useContext } from "react";
import CardsContext from "../../contexts/CardsContext";
import PlayersContext from "../../contexts/PlayersContext";
import StageContext from "../../contexts/StageContext";
import Card from "../Card";

const CardsCommunity = () => {
  const { stage } = useContext(StageContext);
  const { players } = useContext(PlayersContext);
  const { communityCards } = useContext(CardsContext);

  let deckIndices = [1, 2, 3, 5, 7];

  if (stage === "pre-deal") {
    deckIndices = deckIndices.map((index) => index + players.length * 2);
  } else if (stage === "deal") {
    // 0 burn, 1, 2, 3, 4 burn, 5, 6 burn, 7
    deckIndices = [1, 2, 3, 5, 7];
  } else if (stage === "flop") {
    // 0 burn, 1, 2 burn, 3
    deckIndices = [0, 0, 0, 1, 3];
  } else if (stage === "turn") {
    // 0 burn, 1
    deckIndices = [0, 0, 0, 0, 1];
  }

  const communityCardsToDisplay = [
    ...communityCards,
    ...Array(5 - communityCards.length).fill(undefined),
  ].slice(0, 5);

  return (
    <div className="flex space-x-1">
      {communityCardsToDisplay.map((card, index) => (
        <Card
          key={index}
          size="sm"
          card={card}
          deckIndex={deckIndices[index]}
        />
      ))}
    </div>
  );
};

export default CardsCommunity;
