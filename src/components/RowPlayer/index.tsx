import Modal from "../Modal";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import ModalPlayerStats from "../ModalPlayerStats";

// Container for player elements - name, money, hand, score
// When layout = game, it shows the game cards
// Tapping player row opens modal stats

const RowPlayer = () => {
  return (
    <div className="flex">
      RowPlayer
      <Player />
      <PlayerHand />
      <PlayerScore />
      {/* <Modal>
        <ModalPlayerStats />
      </Modal> */}
    </div>
  );
};

export default RowPlayer;
