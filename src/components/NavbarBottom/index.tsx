import { useContext } from "react";
import Button from "../Button";
import GameContext from "contexts/StageContext";
import CardsContext from "contexts/CardsContext";
import { GameStage } from "types/stage";
import PlayersContext from "contexts/PlayersContext";

// Container for game controls at bottom of page
// When layout = game, it shows the game controls (play next round or reset game)

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
      return "New game";
    default:
      return "Start";
  }
};

const NavbarBottom = () => {
  const { stage, nextStage, resetStage } = useContext(GameContext);
  const { resetPlayers } = useContext(PlayersContext);
  const { resetDeck } = useContext(CardsContext);

  const resetGame = () => {
    resetDeck();
    resetPlayers();
    resetStage();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
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
