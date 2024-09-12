import PlayerAdd from "./components/PlayerAdd";
import PlayerRow from "./components/PlayerRow";
import NavbarSwipe from "./components/NavbarSwipe";
import { useContext } from "react";
import PlayersContext from "v1/contexts/PlayersContext";

const App = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="screen pt-20">
      <NavbarSwipe />
      <div className="flex flex-col space-y-1 mt-1">
        {players.map((player) => (
          <PlayerRow name={player.name} key={player.name} />
        ))}
        <PlayerAdd />
      </div>
    </div>
  );
};

export default App;
