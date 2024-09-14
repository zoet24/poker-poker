// Shows cards dealt in round

import Card from "../Card";

const CardsCommunity = () => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Card key={index} size="sm" card={{ rank: "10", suit: "clubs" }} />
      ))}
    </div>
  );
};

export default CardsCommunity;
