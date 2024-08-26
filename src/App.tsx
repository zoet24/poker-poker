import PlayerAdd from "./components/PlayerAdd";
import PlayerRow from "./components/PlayerRow";
import GameControls from "./components/GameControls";
import { useContext } from "react";
import PlayersContext from "contexts/PlayersContext";

const App = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="screen pt-20">
      <GameControls />
      <div className="flex flex-col space-y-1 mt-1">
        {players.map((player) => (
          <PlayerRow name={player.name} />
        ))}
        <PlayerAdd />
      </div>
    </div>
  );
};

export default App;
