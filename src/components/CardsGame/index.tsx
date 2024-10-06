import CardsBurn from "../CardsBurn";
import CardsCommunity from "../CardsCommunity";
import CardsDeck from "../CardsDeck";

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
