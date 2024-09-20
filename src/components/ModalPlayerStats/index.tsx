// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext } from "react";
import Button from "../Button";
import PlayersContext from "contexts/PlayersContext";

interface ModalPlayerStatsProps {
  playerIndex: number;
  handleCloseModal: () => void;
}

const ModalPlayerStats: React.FC<ModalPlayerStatsProps> = ({
  playerIndex,
  handleCloseModal,
}) => {
  const { removePlayer } = useContext(PlayersContext);

  const handleRemovePlayer = () => {
    removePlayer(playerIndex);
    handleCloseModal();
  };

  return (
    <div>
      ModalPlayerStats
      <div className="modal-btns">
        <Button text="Remove player" onClick={handleRemovePlayer}></Button>
      </div>
    </div>
  );
};

export default ModalPlayerStats;
