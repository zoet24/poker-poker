// View stats associated with player's hand
// Controls to hide player's cards or remove player

import BettingContext from "contexts/BettingContext";
import PlayersContext from "contexts/PlayersContext";
import { useContext, useState } from "react";
import StageContext from "../../contexts/StageContext";
import Button from "../Button";

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
  const { setStage } = useContext(StageContext);

  const player = players[playerIndex];
  const allIn = minimumBet >= player.money; // If min bet is bigger than player's money, player must go all in
  const [betAmount, setBetAmount] = useState<number>(
    allIn ? player.money : minimumBet
  );

  const handlePlaceBet = () => {
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
    // Mark the player as folded in the players' state
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex ? { ...player, hasFolded: true } : player
      )
    );

    // Close the modal after updating the player state
    handleCloseModal();
  };

  return (
    <div>
      <div className="input input-currency">
        <label>Bet amount:</label>
        <span className="currency-symbol">£</span>
        <input
          type="number"
          min={allIn ? player.money : minimumBet}
          max={player.money}
          value={betAmount.toFixed(2)}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
      </div>
      <div className="modal-btns">
        <Button
          text={allIn ? "All in" : "Place bet"}
          onClick={handlePlaceBet}
        ></Button>
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
