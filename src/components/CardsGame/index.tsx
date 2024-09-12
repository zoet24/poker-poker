import CardsDeck from "../CardsDeck";
import CardsDealt from "../CardsDealt";
import CardsBurn from "../CardsBurn";

// Deck, dealt cards, burn pile

const CardsGame = () => {
  return (
    <div className="flex">
      <CardsDeck />
      <CardsDealt />
      <CardsBurn />
    </div>
  );
};

export default CardsGame;
