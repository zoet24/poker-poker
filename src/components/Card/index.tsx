import Modal from "../Modal";
import ModalPickCard from "../ModalPickCard";

// Single card
// Can be pre-dealt (no value, dotted border), tapping on this opens pick card modal which is used to pick a value for the card
// Can be dealt and hidden (no value, solid border)
// Can be dealt and shown (value, solid border)

interface CardProps {
  size?: "sm" | "square";
}

const Card: React.FC<CardProps> = ({ size }) => {
  const sizeClass = size ? `card--${size}` : null;

  return (
    <div>
      <div className={`card card--red ${sizeClass ? sizeClass : ""}`}>
        <span>9</span>
        <span>H</span>
      </div>
      {/* <Modal> */}
      {/* <ModalPickCard /> */}
      {/* </Modal> */}
    </div>
  );
};

export default Card;
