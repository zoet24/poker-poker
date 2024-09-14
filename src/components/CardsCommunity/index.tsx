// Shows cards dealt in round

import { useContext } from "react";
import Card from "../Card";
import CardsContext from "contexts/CardsContext";

const CardsCommunity = () => {
  const { communityCards } = useContext(CardsContext);

  const communityCardsToDisplay = [
    ...communityCards,
    ...Array(5 - communityCards.length).fill(undefined),
  ].slice(0, 5);

  return (
    <div className="flex space-x-1">
      {communityCardsToDisplay.map((card, index) => (
        <Card key={index} size="sm" card={card} />
      ))}
    </div>
  );
};

export default CardsCommunity;
