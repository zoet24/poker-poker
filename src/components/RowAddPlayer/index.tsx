import Modal from "../Modal";
import ModalAddPlayer from "../ModalAddPlayer";
import Card from "../Card";
import { useState } from "react";

// Container for adding new player - player elements - name, money, hand, score - are dotted out
// Tapping add player row opens add player modal

const RowAddPlayer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const cardsToDisplay = [...Array(2).fill(undefined)].slice(0, 2);
  const scoreToDisplay = [...Array(5).fill(undefined)].slice(0, 5);

  return (
    <>
      <div className="box p-2" onClick={handleOpenModal}>
        <div className="flex justify-between items-center max-w-96 mx-auto">
          {/* Player */}
          <div className="player">
            <div className="player-name border-dashed text-2xl">+</div>
          </div>
          {/* Player hand */}
          <div className="flex space-x-1">
            {cardsToDisplay.map((card, index) => {
              const deckIndex = 0;
              return (
                <div key={index} className="card--empty pointer-events-none">
                  <Card card={card} showCard={false} deckIndex={deckIndex} />
                </div>
              );
            })}
          </div>
          {/* Player score */}
          <div className="text-center max-w-[136px] truncate">
            <span>---</span>
            <div className="flex space-x-1 mt-1">
              {scoreToDisplay.map((card, index) => (
                <Card key={index} card={card} size="square" showCard={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add player`}
      >
        <ModalAddPlayer handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default RowAddPlayer;
