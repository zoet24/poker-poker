import LayoutContext from "contexts/LayoutContext";
import { useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";

const GameControls = () => {
  const { showCards, setShowCards } = useContext(LayoutContext);

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

  return (
    <div
      {...handlers}
      className="fixed top-0 left-0 right-0 shadow-lg overflow-hidden"
    >
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
        className={`bg-white space-x-1 absolute top-0 left-0 right-0 h-full flex items-center justify-center transform transition-transform duration-500 ${
          showCards ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="chip"></div>
        <div className="chip"></div>
        <div className="chip"></div>
        <div className="chip"></div>
        <div className="chip"></div>
      </div>
      {/* <div className="pot-value">100</div> */}
    </div>
  );
};

export default GameControls;
