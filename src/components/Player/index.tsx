import { PlayerProps } from "../RowPlayer";

// Display for player name and money

const Player: React.FC<PlayerProps> = ({ name, money }) => {
  return (
    <div className="player relative">
      <div className="player-name">{name}</div>
      <div className="player-money">£{money.toFixed(2)}</div>
    </div>
  );
};

export default Player;
