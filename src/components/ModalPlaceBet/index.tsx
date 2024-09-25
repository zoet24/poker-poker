// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext } from "react";
import Button from "../Button";
import PlayersContext from "contexts/PlayersContext";

interface ModalPlaceBetProps {
  playerIndex: number;
  handleCloseModal: () => void;
}

const ModalPlaceBet: React.FC<ModalPlaceBetProps> = ({
  playerIndex,
  handleCloseModal,
}) => {
  const { players, setPlayers } = useContext(PlayersContext);

  const handleFold = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex ? { ...player, hasFolded: true } : player
      )
    );
    handleCloseModal();
  };

  return (
    <div>
      <div className="input input-number">
        <label>Bet amount:</label>
        <input type="number" min={0} max={players[playerIndex].money} />
      </div>
      <div className="modal-btns">
        <Button text="Place bet" onClick={() => console.log("Hello")}></Button>
        <Button text="Check" onClick={() => console.log("Hello")}></Button>
        <Button text="Fold" onClick={handleFold}></Button>
      </div>
    </div>
  );
};

export default ModalPlaceBet;
