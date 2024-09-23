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
  const { players } = useContext(PlayersContext);
  return (
    <div>
      <div className="input input-number">
        <label>Bet amount:</label>
        <input type="number" min={0} max={players[playerIndex].money} />
      </div>
      <div className="modal-btns">
        <Button text="Place bet" onClick={() => console.log("Hello")}></Button>
        <Button text="Check" onClick={() => console.log("Hello")}></Button>
        <Button text="Fold" onClick={() => console.log("Hello")}></Button>
      </div>
    </div>
  );
};

export default ModalPlaceBet;
