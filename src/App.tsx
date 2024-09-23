import RowPlayer from "./components/RowPlayer";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";
import { useContext } from "react";
import PlayersContext from "contexts/PlayersContext";

const App = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="bg-blue-500 h-screen relative">
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
