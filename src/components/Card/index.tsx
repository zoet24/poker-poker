import Modal from "../Modal";
import ModalPickCard from "../ModalPickCard";
import { Card as CardType, suitSymbols, suitColors } from "../../types/cards";

// Single card
// Can be pre-dealt (no value, dotted border), tapping on this opens pick card modal which is used to pick a value for the card
// Can be dealt and hidden (no value, solid border)
// Can be dealt and shown (value, solid border)

interface CardProps {
  card: CardType;
  size?: "sm" | "square";
}

const getCardDisplayValue = (rank: CardType["rank"]): string => {
  switch (rank) {
    case "11":
      return "J"; // Jack
    case "12":
      return "Q"; // Queen
    case "13":
      return "K"; // King
    case "14":
      return "A"; // Ace
    default:
      return rank; // Return number rank as string for cards 2-10
  }
};

const Card: React.FC<CardProps> = ({ card, size }) => {
  const colourClass = `card--${suitColors[card.suit]}`;
  const sizeClass = size ? `card--${size}` : null;

  return (
    <div>
      <div className={`card ${colourClass} ${sizeClass ? sizeClass : ""}`}>
        <span>{getCardDisplayValue(card.rank)}</span>
        <span>{suitSymbols[card.suit]}</span>
      </div>
      {/* <Modal> */}
      {/* <ModalPickCard /> */}
      {/* </Modal> */}
    </div>
  );
};

export default Card;
