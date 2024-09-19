import { useContext, useState } from "react";
import InputSelect from "../InputSelect";
import { Card } from "../../types/cards";
import CardsContext from "contexts/CardsContext";
import { getCardDisplayValue, reorderDeck } from "../../utils/deck";
import Button from "../Button";

// Controls to select value and suit of the card before the game starts
const ModalPickCard = () => {
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

  // Handle card confirmation and reorder the deck
  const handleConfirmCard = () => {
    if (selectedCard) {
      const updatedDeck = reorderDeck(deck, selectedCard);
      setDeck(updatedDeck);
      console.log(`Confirmed: ${selectedCard.rank} of ${selectedCard.suit}`);
      console.log(updatedDeck);
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
        <Button text="Confirm card" onClick={handleConfirmCard}></Button>
      </div>
    </>
  );
};

export default ModalPickCard;
