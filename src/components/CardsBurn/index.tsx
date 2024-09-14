// Shows number of cards in burn pile

import CardsContext from "contexts/CardsContext";
import { useContext } from "react";

const CardsBurn = () => {
  const { burn } = useContext(CardsContext);

  return (
    <div className="card card--sm card--horizontal">Burn: {burn.length}</div>
  );
};

export default CardsBurn;
