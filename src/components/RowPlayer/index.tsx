import { Player as PlayerType } from "../../types/players";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";

interface RowPlayerProps {
  player: PlayerType;
  playerIndex: number;
}

const RowPlayer: React.FC<RowPlayerProps> = ({ player, playerIndex }) => {
  const { hand, money, showCards, bestHand = null, hasFolded } = player;

  return (
    <div className="box p-2">
      <div
        className={`player-row ${hasFolded ? "player-row--disabled" : ""} ${
          money === 0 ? "player-row--out" : ""
        }`}
      >
        <Player player={player} playerIndex={playerIndex} />
        <PlayerHand
          hand={hand}
          showCards={showCards}
          playerIndex={playerIndex}
        />
        <PlayerScore showCards={showCards} bestHand={bestHand} />
      </div>
    </div>
  );
};

export default RowPlayer;
