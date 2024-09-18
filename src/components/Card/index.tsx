import Modal from "../Modal";
import ModalPickCard from "../ModalPickCard";
import { Card as CardType, suitSymbols, suitColors } from "../../types/cards";
import { getCardDisplayValue } from "../../utils/deck";
import { useState } from "react";

// Single card
// Can be pre-dealt (no value, dotted border), tapping on this opens pick card modal which is used to pick a value for the card
// Can be dealt and hidden (no value, solid border)
// Can be dealt and shown (value, solid border)

interface CardProps {
  card?: CardType;
  size?: "sm" | "square";
  showCard?: boolean;
}

const Card: React.FC<CardProps> = ({ card, size, showCard = true }) => {
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
        <ModalPickCard />
      </Modal>
    </div>
  );
};

export default Card;
