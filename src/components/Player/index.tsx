// Display for player name and money

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
  const { name, money, showCards } = player;
  const { toggleShowCards } = useContext(PlayersContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className="player relative">
        <div className="player-name cursor-pointer" onClick={handleOpenModal}>
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
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Player - ${name}`}
      >
        <ModalPlayerStats
          handleCloseModal={handleCloseModal}
          playerIndex={playerIndex}
        />
      </Modal>
    </>
  );
};

export default Player;
