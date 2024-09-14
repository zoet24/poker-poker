import RowPlayer from "./components/RowPlayer";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";
import { useContext, useEffect } from "react";
import PlayersContext from "contexts/PlayersContext";
import GameContext from "contexts/GameContext";

const App = () => {
  const { players } = useContext(PlayersContext);
  // const { stage } = useContext(GameContext);

  return (
    <div className="bg-blue-500 h-screen relative">
      <NavbarTop />
      <div className="pt-24 space-y-1">
        {players.map((player, index) => (
          <RowPlayer key={index} player={player} />
        ))}
        {/* <RowAddPlayer /> */}
      </div>
      <NavbarBottom />
    </div>
  );
};

export default App;
