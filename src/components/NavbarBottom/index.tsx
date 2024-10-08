import { useContext } from "react";
import BettingContext from "../../contexts/BettingContext";
import StageContext from "../../contexts/StageContext";
import { GameStage } from "../../types/stage";
import Button from "../Button";

const getButtonText = (stage: GameStage): string => {
  switch (stage) {
    case "pre-deal":
      return "Deal cards";
    case "deal":
      return "Deal flop";
    case "flop":
      return "Deal turn";
    case "turn":
      return "Deal river";
    case "river":
      return "Reveal";
    case "showdown":
      return "New game";
    default:
      return "Start";
  }
};

const NavbarBottom = () => {
  const { resetGame } = useContext(BettingContext);
  const { stage, nextStage } = useContext(StageContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9]">
      <div className="box flex justify-center relative p-2">
        <div className="btn-pair">
          <Button text={getButtonText(stage)} onClick={nextStage} />
          <Button
            text="Reset game"
            onClick={resetGame}
            disabled={stage === "pre-deal" || stage === "river"}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
