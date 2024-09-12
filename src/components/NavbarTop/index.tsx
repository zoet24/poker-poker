import CardsGame from "../CardsGame";
import Pot from "../Pot";

// Container for game elements at top of page
// When layout = game, it shows the game cards

const NavbarTop = () => {
  return (
    <div className="bg-white fixed top-0 left-0 right-0">
      NavbarTop
      <div className="flex relative">
        <CardsGame />
        <Pot />
      </div>
    </div>
  );
};

export default NavbarTop;
