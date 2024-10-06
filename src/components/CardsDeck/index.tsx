import { useContext } from "react";
import CardsContext from "../../contexts/CardsContext";

const CardsDeck = () => {
  const { deck } = useContext(CardsContext);

  return (
    <div className="card card--sm card--horizontal">Deck: {deck.length}</div>
  );
};

export default CardsDeck;
