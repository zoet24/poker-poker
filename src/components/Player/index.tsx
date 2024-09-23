// Display for player name and money

import ModalPlaceBet from "../ModalPlaceBet";
import Modal from "../Modal";
import ModalPlayerStats from "../ModalPlayerStats";
import PlayersContext from "contexts/PlayersContext";
import React, { useContext, useState } from "react";
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
        {/* <div className="player-controls player-controls--money bet bet--win">
          £{(2).toFixed(2)}
        </div> */}
        {/* <div className="player-controls player-controls--money bet bet--lose">
          £{(1).toFixed(2)}
        </div> */}
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
