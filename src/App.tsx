import PlayersContext from "contexts/PlayersContext";
import { useContext } from "react";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";
import RowPlayer from "./components/RowPlayer";

const App = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="bg-blue h-screen relative">
      <NavbarTop />
      <div className="pt-24 space-y-1">
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
