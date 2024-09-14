// Shows number of cards remaining in deck

import CardsContext from "contexts/CardsContext";
import { useContext } from "react";

const CardsDeck = () => {
  const { deck } = useContext(CardsContext);

  return (
    <div className="card card--sm card--horizontal">Deck: {deck.length}</div>
  );
};

export default CardsDeck;
