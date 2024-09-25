import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import { Player as PlayerProps } from "../../types/players";

// Container for player elements - name, money, hand, score
// When layout = game, it shows the game cards
// Tapping player row opens modal stats

interface RowPlayerProps {
  player: PlayerProps;
  playerIndex: number;
}

const RowPlayer: React.FC<RowPlayerProps> = ({ player, playerIndex }) => {
  const { hand, showCards, bestHand = null, hasFolded } = player;

  const foldedClass = hasFolded ? "folded" : "";

  return (
    <div className="box p-2">
      <div
        className={`flex justify-between items-center max-w-96 mx-auto ${foldedClass}`}
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
