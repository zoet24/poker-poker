// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext, useState } from "react";
import Button from "../Button";
import PlayersContext from "contexts/PlayersContext";

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
