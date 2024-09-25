// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext, useState } from "react";
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
  const [betAmount, setBetAmount] = useState<number>(0);

  const handlePlaceBet = () => {
    console.log("Place bet!");

    const player = players[playerIndex];
    handleCloseModal();
  };

  const handleCheck = () => {
    console.log("Check!");
    handleCloseModal();
  };

  const handleFold = () => {
    console.log("Fold!");

    // Mark the player as folded and move to the next player
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
        <input
          type="number"
          min={0}
          max={players[playerIndex].money}
          value={betAmount.toFixed(2)}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
      </div>
      <div className="modal-btns">
        <Button text="Place bet" onClick={handlePlaceBet}></Button>
        <Button text="Check" onClick={handleCheck}></Button>
        <Button text="Fold" onClick={handleFold}></Button>
      </div>
    </div>
  );
};

export default ModalPlaceBet;
