import CardsGame from "../CardsGame";
import Pot from "../Pot";

// Container for game elements at top of page
// When layout = game, it shows the game cards

const NavbarTop = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="box flex justify-center relative p-2">
        <CardsGame />
        <Pot />
      </div>
    </div>
  );
};

export default NavbarTop;
