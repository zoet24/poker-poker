import { useContext } from "react";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";
import RowPlayer from "./components/RowPlayer";
import PlayersContext from "./contexts/PlayersContext";

const App = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="relative">
      <NavbarTop />
      <div className="pt-[88px] pb-[68px] space-y-1">
        {players.map((player, index) => (
          <RowPlayer key={index} player={player} playerIndex={index} />
        ))}
        <RowAddPlayer />
      </div>
      <NavbarBottom />
    </div>
  );
};

export default App;
