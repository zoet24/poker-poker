import Card from "../Card";

// Display for player hand

const PlayerHand = () => {
  return (
    <div className="flex space-x-1">
      <Card card={{ rank: "10", suit: "clubs" }} />
      <Card card={{ rank: "10", suit: "diamonds" }} />
    </div>
  );
};

export default PlayerHand;
