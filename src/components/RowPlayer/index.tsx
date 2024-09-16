import Modal from "../Modal";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import ModalPlayerStats from "../ModalPlayerStats";
import { Player as PlayerProps } from "../../types/players";

// Container for player elements - name, money, hand, score
// When layout = game, it shows the game cards
// Tapping player row opens modal stats

interface RowPlayerProps {
  player: PlayerProps;
}

const RowPlayer: React.FC<RowPlayerProps> = ({ player }) => {
  const { name, money, hand, showCards, bestHand = null } = player;

  return (
    <div className="box p-2">
      <div className="flex justify-between items-center max-w-96 mx-auto">
        <Player name={name} money={money} />
        <PlayerHand hand={hand} showCards={showCards} />
        <PlayerScore showCards={showCards} bestHand={bestHand} />
      </div>
      {/* <Modal>
        <ModalPlayerStats />
      </Modal> */}
    </div>
  );
};

export default RowPlayer;
