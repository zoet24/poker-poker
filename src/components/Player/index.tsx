// Display for player name and money

import React from "react";
import { Player as PlayerProps } from "types/players";

// Create a type that omits the "hand" property from PlayerProps
type PlayerDisplayProps = Omit<PlayerProps, "hand">;

const Player: React.FC<PlayerDisplayProps> = ({ name, money }) => {
  return (
    <div className="player relative">
      <div className="player-name">{name}</div>
      <div className="player-money">£{money.toFixed(2)}</div>
    </div>
  );
};

export default Player;
