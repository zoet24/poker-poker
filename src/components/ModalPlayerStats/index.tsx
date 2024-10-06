import { useContext } from "react";
import PlayersContext from "../../contexts/PlayersContext";
import StageContext from "../../contexts/StageContext";
import Button from "../Button";

interface ModalPlayerStatsProps {
  playerIndex: number;
  handleCloseModal: () => void;
}

const ModalPlayerStats: React.FC<ModalPlayerStatsProps> = ({
  playerIndex,
  handleCloseModal,
}) => {
  const { removePlayer } = useContext(PlayersContext);
  const { stage } = useContext(StageContext);

  const handleRemovePlayer = () => {
    removePlayer(playerIndex);
    handleCloseModal();
  };

  return (
    <div>
      ModalPlayerStats
      <div className="modal-btns">
        <Button
          text="Remove player"
          disabled={stage !== "pre-deal"}
          onClick={handleRemovePlayer}
        ></Button>
      </div>
    </div>
  );
};

export default ModalPlayerStats;
