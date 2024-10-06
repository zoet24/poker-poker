import { useContext, useState } from "react";
import CardsContext from "../../contexts/CardsContext";
import { Card } from "../../types/cards";
import { getCardDisplayValue, reorderDeck } from "../../utils/deck";
import Button from "../Button";
import InputSelect from "../InputSelect";

interface ModalPickCardProps {
  deckIndex?: number;
  handleCloseModal: () => void;
}

// Controls to select value and suit of the card before the game starts
const ModalPickCard: React.FC<ModalPickCardProps> = ({
  deckIndex,
  handleCloseModal,
}) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const { deck, setDeck } = useContext(CardsContext);

  const handleCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selected = deck.find(
      (card) => `${card.rank} of ${card.suit}` === selectedValue
    );
    setSelectedCard(selected || null);
  };

  const sortedDeck = [...deck].sort((a: Card, b: Card) => {
    const rankOrder = parseInt(a.rank) - parseInt(b.rank);
    if (rankOrder === 0) {
      return a.suit.localeCompare(b.suit);
    }
    return rankOrder;
  });

  const handleConfirmCard = (deckIndex: number) => {
    if (selectedCard) {
      const updatedDeck = reorderDeck(deck, selectedCard, deckIndex);
      setDeck(updatedDeck);
      handleCloseModal();
    }
  };

  return (
    <>
      <InputSelect
        label="Select Card"
        placeholder="Select Card"
        value={
          selectedCard ? `${selectedCard.rank} of ${selectedCard.suit}` : ""
        }
        onChange={handleCardChange}
        options={sortedDeck.map((card) => ({
          value: `${card.rank} of ${card.suit}`,
          label: `${getCardDisplayValue(card.rank)} of ${card.suit}`,
        }))}
      />
      <div className="modal-btns">
        <Button
          text="Confirm card"
          onClick={() => handleConfirmCard(deckIndex ?? 0)}
        ></Button>
      </div>
    </>
  );
};

export default ModalPickCard;
