// Display for player name and money

import ModalPlaceBet from "../ModalPlaceBet";
import Modal from "../Modal";
import ModalPlayerStats from "../ModalPlayerStats";
import PlayersContext from "contexts/PlayersContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerBasicInfo } from "types/players";

interface PlayerProps {
  player: PlayerBasicInfo;
  playerIndex: number;
}

const Player: React.FC<PlayerProps> = ({ player, playerIndex }) => {
  const { name, money, showCards, role } = player;
  const { toggleShowCards } = useContext(PlayersContext);

  const [isModalPlayerStatsOpen, setModalPlayerStatsOpen] = useState(false);
  const handleOpenModalPlayerStats = () => setModalPlayerStatsOpen(true);
  const handleCloseModalPlayerStats = () => {
    setModalPlayerStatsOpen(false);
  };

  const [isModalPlaceBetOpen, setModalPlaceBetOpen] = useState(false);
  const handleOpenModalPlaceBet = () => setModalPlaceBetOpen(true);
  const handleCloseModalPlaceBet = () => setModalPlaceBetOpen(false);

  let playerRoleClass = "";

  if (role.isDealer) {
    playerRoleClass = "player--dealer";
  } else if (role.isBigBlind) {
    playerRoleClass = "player--big-blind";
  } else if (role.isSmallBlind) {
    playerRoleClass = "player--small-blind";
  }

  const prevMoneyRef = useRef<number>(money);
  const [moneyChange, setMoneyChange] = useState<number | null>(null);

  useEffect(() => {
    const prevMoney = prevMoneyRef.current;
    const change = money - prevMoney;

    console.log("Change:", name, change);

    if (change !== 0) {
      setMoneyChange(change);
      prevMoneyRef.current = money;

      const timeout = setTimeout(() => setMoneyChange(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [money]);

  return (
    <>
      <div className={`player ${playerRoleClass}`}>
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
        title={`Player - ${name} - place bet`}
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
