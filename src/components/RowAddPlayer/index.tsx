import Modal from "../Modal";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import ModalAddPlayer from "../ModalAddPlayer";

// Container for adding new player - player elements - name, money, hand, score - are dotted out
// Tapping add player row opens add player modal

const RowAddPlayer = () => {
  return (
    <div className="flex">
      RowAddPlayer
      <div>+</div>
      <PlayerHand />
      <PlayerScore />
      {/* <Modal>
        <ModalAddPlayer />
      </Modal> */}
    </div>
  );
};

export default RowAddPlayer;
