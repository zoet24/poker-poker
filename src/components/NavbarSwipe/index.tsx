import ChipContext from "contexts/ChipContext";
import Chip from "../Chip";
import LayoutContext from "contexts/LayoutContext";
import { useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";

const NavbarSwipe = () => {
  const { showCards, setShowCards } = useContext(LayoutContext);
  const { chipValues, updateChipValues } = useContext(ChipContext);

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowCards(false),
    onSwipedRight: () => setShowCards(true),
    onSwiping: disableScroll,
    onSwiped: enableScroll,
    trackMouse: true,
  });

  const handleChipChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        updateChipValues(index, newValue);
      }
    };

  return (
    <div
      {...handlers}
      className="fixed top-0 left-0 right-0 shadow-lg cursor-pointer z-10"
    >
      <div className="pot-value overflow-hidden relative">
        <div
          className={`w-full text-center transform transition-transform duration-500 ${
            showCards ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          0
        </div>
        <input
          className={`bg-black w-full text-center absolute left-0 transform transition-transform duration-500 focus-visible:outline-none ${
            showCards ? "translate-x-full" : "translate-x-0"
          }`}
          placeholder="£5.00"
        ></input>
      </div>

      <div className="overflow-hidden">
        <div
          className={`container flex items-center justify-center space-x-1 !h-20 transform transition-transform duration-500 ${
            showCards ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="card card--sm card--rotate"></div>
          <div className="card card--sm"></div>
          <div className="card card--sm"></div>
          <div className="card card--sm"></div>
          <div className="card card--sm"></div>
          <div className="card card--sm"></div>
          <div className="card card--sm card--rotate"></div>
        </div>
        <div
          className={`bg-white space-x-2 absolute top-0 left-0 right-0 h-full flex items-center justify-center transform transition-transform duration-500 ${
            showCards ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {chipValues.map((chipValue, index) => (
            <Chip
              key={index}
              index={index}
              value={chipValue}
              onChange={handleChipChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarSwipe;
