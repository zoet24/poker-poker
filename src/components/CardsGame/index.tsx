import CardsDeck from "../CardsDeck";
import CardsCommunity from "../CardsCommunity";
import CardsBurn from "../CardsBurn";

// Deck, community cards, burn pile

const CardsGame = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <CardsDeck />
      <CardsCommunity />
      <CardsBurn />
    </div>
  );
};

export default CardsGame;
