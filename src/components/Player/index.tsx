// Display for player name and money

import ModalPlaceBet from "../ModalPlaceBet";
import Modal from "../Modal";
import ModalPlayerStats from "../ModalPlayerStats";
import PlayersContext from "contexts/PlayersContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Player as PlayerType } from "types/players";
import StageContext from "contexts/StageContext";

interface PlayerProps {
  player: PlayerType;
  playerIndex: number;
}

const Player: React.FC<PlayerProps> = ({ player, playerIndex }) => {
  const { name, money, showCards, role, isComp, hasFolded } = player;
  const { toggleShowCards } = useContext(PlayersContext);
  const { stage } = useContext(StageContext);

  const [isModalPlayerStatsOpen, setModalPlayerStatsOpen] = useState(false);
  const handleOpenModalPlayerStats = () => setModalPlayerStatsOpen(true);
  const handleCloseModalPlayerStats = () => {
    setModalPlayerStatsOpen(false);
  };

  const [isModalPlaceBetOpen, setModalPlaceBetOpen] = useState(false);
  const handleOpenModalPlaceBet = () => setModalPlaceBetOpen(true);
  const handleCloseModalPlaceBet = () => setModalPlaceBetOpen(false);

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

  useEffect(() => {
    if (!isComp && !hasFolded && stage !== "pre-deal" && stage !== "showdown") {
      handleOpenModalPlaceBet();
    }
  }, [stage]);

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
      <Modal
        isOpen={isModalPlaceBetOpen}
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
