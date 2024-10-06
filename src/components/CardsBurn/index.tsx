import { useContext } from "react";
import CardsContext from "../../contexts/CardsContext";

const CardsBurn = () => {
  const { burn } = useContext(CardsContext);

  return (
    <div className="card card--sm card--horizontal">Burn: {burn.length}</div>
  );
};

export default CardsBurn;
