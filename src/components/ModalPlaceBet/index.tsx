// View stats associated with player's hand
// Controls to hide player's cards or remove player

import { useContext, useState } from "react";
import Button from "../Button";
import PlayersContext from "contexts/PlayersContext";
import BettingContext from "contexts/BettingContext";

interface ModalPlaceBetProps {
  playerIndex: number;
  handleCloseModal: () => void;
}

const ModalPlaceBet: React.FC<ModalPlaceBetProps> = ({
  playerIndex,
  handleCloseModal,
}) => {
  const { players, setPlayers } = useContext(PlayersContext);
  const { takePlayerBet, minimumBet } = useContext(BettingContext);
  const [betAmount, setBetAmount] = useState<number>(minimumBet);

  const handlePlaceBet = () => {
    const player = players[playerIndex];

    if (betAmount > 0 && betAmount <= player.money) {
      takePlayerBet(playerIndex, betAmount);
      handleCloseModal();
    }
  };

  const handleCheck = () => {
    takePlayerBet(playerIndex, 0);
    handleCloseModal();
  };

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
        <input
          type="number"
          min={minimumBet}
          max={players[playerIndex].money}
          value={betAmount.toFixed(2)}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
      </div>
      <div className="modal-btns">
        <Button text="Place bet" onClick={handlePlaceBet}></Button>
        <Button
          text="Check"
          onClick={handleCheck}
          disabled={minimumBet > 0}
        ></Button>
        <Button text="Fold" onClick={handleFold}></Button>
      </div>
    </div>
  );
};

export default ModalPlaceBet;
