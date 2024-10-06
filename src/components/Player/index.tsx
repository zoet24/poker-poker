import React, { useContext, useEffect, useRef, useState } from "react";
import BettingContext from "../../contexts/BettingContext";
import PlayersContext from "../../contexts/PlayersContext";
import StageContext from "../../contexts/StageContext";
import { Player as PlayerType } from "../../types/players";
import Modal from "../Modal";
import ModalPlaceBet from "../ModalPlaceBet";
import ModalPlayerStats from "../ModalPlayerStats";

interface PlayerProps {
  player: PlayerType;
  playerIndex: number;
}

const Player: React.FC<PlayerProps> = ({ player, playerIndex }) => {
  const { name, money, showCards, role } = player;
  const { toggleShowCards } = useContext(PlayersContext);
  const { stage } = useContext(StageContext);
  const { placeBetModalState, closePlaceBetModal } = useContext(BettingContext);

  const [isModalPlayerStatsOpen, setModalPlayerStatsOpen] = useState(false);
  const [isModalPlaceBetOpen, setModalPlaceBetOpen] = useState(false);

  const handleOpenModalPlayerStats = () => setModalPlayerStatsOpen(true);
  const handleCloseModalPlayerStats = () => setModalPlayerStatsOpen(false);

  const handleCloseModalPlaceBet = () => {
    closePlaceBetModal(player.name);
    setModalPlaceBetOpen(false);
  };

  const prevMoneyRef = useRef<number>(money);
  const [moneyChange, setMoneyChange] = useState<number | null>(null);

  useEffect(() => {
    const prevMoney = prevMoneyRef.current;
    const change = money - prevMoney;

    if (change !== 0) {
      setMoneyChange(change);
      prevMoneyRef.current = money;

      const timeout = setTimeout(() => setMoneyChange(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [money]);

  return (
    <>
      <div className="player">
        <div
          className="player-name cursor-pointer"
          onClick={handleOpenModalPlayerStats}
        >
          {name}
        </div>
        <div
          className="player-controls player-controls--show-cards cursor-pointer"
          onClick={() => toggleShowCards(playerIndex)}
        >
          {showCards ? "Hide" : "Show"}
        </div>
        <div className="player-controls player-controls--money">
          £{money.toFixed(2)}
        </div>
        {moneyChange !== null && (
          <div
            className={`player-controls player-controls--money bet ${
              moneyChange > 0 ? "bet--win" : "bet--lose"
            }`}
          >
            {`£${Math.abs(moneyChange).toFixed(2)}`}
          </div>
        )}
        {/* Role display */}
        {!Object.values(role).every((value) => value === false) && (
          <div className="player-controls player-controls--role">
            {role.isDealer
              ? "D"
              : role.isSmallBlind
              ? "b"
              : role.isBigBlind
              ? "B"
              : ""}
          </div>
        )}
      </div>

      {/* Modal for Player Stats */}
      <Modal
        isOpen={isModalPlayerStatsOpen}
        onClose={handleCloseModalPlayerStats}
        title={`Player - ${name} - player stats`}
      >
        <ModalPlayerStats
          handleCloseModal={handleCloseModalPlayerStats}
          playerIndex={playerIndex}
        />
      </Modal>

      {/* Modal for Placing Bet */}
      <Modal
        isOpen={placeBetModalState[name]?.open}
        onClose={handleCloseModalPlaceBet}
        title={`${name} - place ${stage} bet`}
      >
        <ModalPlaceBet
          handleCloseModal={handleCloseModalPlaceBet}
          playerIndex={playerIndex}
        />
      </Modal>
    </>
  );
};

export default Player;
