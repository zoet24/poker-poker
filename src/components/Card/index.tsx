import { useState } from "react";
import { Card as CardType, suitColors, suitSymbols } from "../../types/cards";
import { getCardDisplayValue } from "../../utils/deck";
import Modal from "../Modal";
import ModalPickCard from "../ModalPickCard";

interface CardProps {
  card?: CardType;
  size?: "sm" | "square";
  showCard?: boolean;
  deckIndex?: number;
}

const Card: React.FC<CardProps> = ({
  card,
  size,
  showCard = true,
  deckIndex,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!card && size !== "square") {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  const colourClass = card ? `card--${suitColors[card.suit]}` : null;
  const sizeClass = size ? `card--${size}` : null;

  return (
    <div>
      <div
        className={`card ${colourClass ? colourClass : ""} ${
          sizeClass ? sizeClass : ""
        } ${card ? "" : "card--empty"}`}
        onClick={handleOpenModal}
      >
        {card && showCard && (
          <>
            <span>{getCardDisplayValue(card.rank)}</span>
            <span>{suitSymbols[card.suit]}</span>
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Pick a card"
      >
        <ModalPickCard
          deckIndex={deckIndex ?? 0}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Card;
