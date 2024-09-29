// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext } from "react";
import Button from "../Button";
import PlayersContext from "contexts/PlayersContext";
import StageContext from "contexts/StageContext";

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
