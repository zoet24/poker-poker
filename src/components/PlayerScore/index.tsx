// Display for player score

import Card from "../Card";

const PlayerScore = () => {
  return (
    <div className="text-center">
      <span>High card (123)</span>
      <div className="flex space-x-1 mt-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Card key={index} size="square" />
        ))}
      </div>
    </div>
  );
};

export default PlayerScore;
