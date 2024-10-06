import { useContext, useState } from "react";
import StageContext from "../../contexts/StageContext";
import Card from "../Card";
import Modal from "../Modal";
import ModalAddPlayer from "../ModalAddPlayer";

const RowAddPlayer = () => {
  const { stage } = useContext(StageContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    if (stage === "pre-deal") {
      setModalOpen(true);
    } else {
      return;
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const cardsToDisplay = [...Array(2).fill(undefined)].slice(0, 2);
  const scoreToDisplay = [...Array(5).fill(undefined)].slice(0, 5);

  return (
    <>
      <div className="box p-2" onClick={handleOpenModal}>
        <div
          className={`player-row ${
            stage !== "pre-deal" ? "player-row--disabled" : ""
          }`}
        >
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
            <span className="player-hand-best">---</span>
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
