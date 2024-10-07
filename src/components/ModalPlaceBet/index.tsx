import { useContext, useState } from "react";
import BettingContext from "../../contexts/BettingContext";
import PlayersContext from "../../contexts/PlayersContext";
import Button from "../Button";

interface ModalPlaceBetProps {
  playerIndex: number;
  handleCloseModal: (betAmount: number, hasFolded: boolean) => void;
}

const ModalPlaceBet: React.FC<ModalPlaceBetProps> = ({
  playerIndex,
  handleCloseModal,
}) => {
  const { players, setPlayers } = useContext(PlayersContext);
  const { minimumBet, setMinimumBet } = useContext(BettingContext);

  const player = players[playerIndex];
  const allIn = minimumBet >= player.money; // If min bet is bigger than player's money, player must go all in
  const [betAmount, setBetAmount] = useState<number>(
    allIn ? player.money : minimumBet
  );

  const handlePlaceBet = () => {
    if (betAmount > 0 && betAmount <= player.money) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((p, index) =>
          index === playerIndex
            ? {
                ...p,
                currentBet: p.currentBet + betAmount,
                money: Math.max(0, p.money - betAmount),
              }
            : p
        )
      );

      handleCloseModal(betAmount, false); // Player has not folded
    }
  };

  const handleCheck = () => {
    handleCloseModal(0, false); // Player checks, has not folded
  };

  const handleFold = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex ? { ...player, hasFolded: true } : player
      )
    );

    handleCloseModal(0, true); // Player has folded
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
        {allIn ? (
          <Button text="All in" onClick={handlePlaceBet}></Button>
        ) : (
          <Button
            text={
              minimumBet == betAmount && minimumBet > 0 ? "Call" : "Place bet"
            }
            onClick={handlePlaceBet}
            disabled={betAmount === 0}
          ></Button>
        )}
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
