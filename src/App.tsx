import PlayerAdd from "./PlayerAdd";
import PlayerRow from "./PlayerRow";
import GameControls from "./GameControls";

const App = () => {
  return (
    <div className="screen pt-20">
      <GameControls />
      <div className="flex flex-col space-y-1 mt-1">
        <PlayerRow />
        <PlayerRow name="Fran" />
        <PlayerRow name="Mike" potValue={20} hand="Full House" />
        <PlayerRow name="Bron" potValue={5} hand="Two Pair" />
        <PlayerAdd />
      </div>
    </div>
  );
};

export default App;
