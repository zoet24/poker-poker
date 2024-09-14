import Modal from "../Modal";
import ModalPickCard from "../ModalPickCard";
import { Card as CardType, suitSymbols, suitColors } from "../../types/cards";

// Single card
// Can be pre-dealt (no value, dotted border), tapping on this opens pick card modal which is used to pick a value for the card
// Can be dealt and hidden (no value, solid border)
// Can be dealt and shown (value, solid border)

interface CardProps {
  card?: CardType;
  size?: "sm" | "square";
  showCard?: boolean;
}

const getCardDisplayValue = (rank: CardType["rank"]): string => {
  switch (rank) {
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    case "14":
      return "A";
    default:
      return rank;
  }
};

const Card: React.FC<CardProps> = ({ card, size, showCard = true }) => {
  const colourClass = card ? `card--${suitColors[card.suit]}` : null;
  const sizeClass = size ? `card--${size}` : null;

  return (
    <div>
      <div
        className={`card ${colourClass ? colourClass : ""} ${
          sizeClass ? sizeClass : ""
        } ${card ? "" : "card--empty"}`}
      >
        {card && showCard && (
          <>
            <span>{getCardDisplayValue(card.rank)}</span>
            <span>{suitSymbols[card.suit]}</span>
          </>
        )}
      </div>
      {/* <Modal> */}
      {/* <ModalPickCard /> */}
      {/* </Modal> */}
    </div>
  );
};

export default Card;
