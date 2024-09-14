// Display for player name and money

import React from "react";
import { PlayerBasicInfo } from "types/players";

const Player: React.FC<PlayerBasicInfo> = ({ name, money }) => {
  return (
    <div className="player relative">
      <div className="player-name">{name}</div>
      <div className="player-money">£{money.toFixed(2)}</div>
    </div>
  );
};

export default Player;
