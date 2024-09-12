import Modal from "../Modal";
import Player from "../Player";
import PlayerHand from "../PlayerHand";
import PlayerScore from "../PlayerScore";
import ModalAddPlayer from "../ModalAddPlayer";

// Container for adding new player - player elements - name, money, hand, score - are dotted out
// Tapping add player row opens add player modal

const RowAddPlayer = () => {
  const handleAddPlayer = () => {
    console.log("Handle add player");
  };

  return (
    <div className="box p-2 cursor-pointer" onClick={handleAddPlayer}>
      <div className="flex justify-between items-center max-w-96 mx-auto">
        {/* Player */}
        <div className="player-name border-dashed text-2xl">+</div>
        <PlayerHand />
        <PlayerScore />
      </div>
      {/* <Modal>
      <ModalPlayerStats />
    </Modal> */}
    </div>
  );
};

export default RowAddPlayer;
