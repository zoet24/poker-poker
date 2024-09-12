import Modal from "../Modal";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import ModalPlayerStats from "../ModalPlayerStats";

// Container for player elements - name, money, hand, score
// When layout = game, it shows the game cards
// Tapping player row opens modal stats

export interface PlayerProps {
  name: string;
  money: number;
}

interface RowPlayerProps {
  player: PlayerProps;
}

const RowPlayer: React.FC<RowPlayerProps> = ({ player }) => {
  const { name, money } = player;

  return (
    <div className="box p-2">
      <div className="flex justify-between items-center max-w-96 mx-auto">
        <Player name={name} money={money} />
        <PlayerHand />
        <PlayerScore />
      </div>
      {/* <Modal>
        <ModalPlayerStats />
      </Modal> */}
    </div>
  );
};

export default RowPlayer;
