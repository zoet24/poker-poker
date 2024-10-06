import { useContext, useState } from "react";
import PlayersContext from "../../contexts/PlayersContext";
import Button from "../Button";

interface ModalAddPlayerProps {
  handleCloseModal: () => void;
}

const ModalAddPlayer: React.FC<ModalAddPlayerProps> = ({
  handleCloseModal,
}) => {
  const [playerName, setPlayerName] = useState("");
  const { addPlayer } = useContext(PlayersContext);

  const handleAddPlayer = () => {
    addPlayer(playerName);
    handleCloseModal();
  };

  return (
    <>
      <div className="input input-text">
        <label>Player name:</label>
        <input
          value={playerName}
          type="text"
          placeholder="Enter player name"
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="modal-btns">
        <Button text="Add player" onClick={handleAddPlayer}></Button>
      </div>
    </>
  );
};

export default ModalAddPlayer;
