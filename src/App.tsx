import React from "react";
import PlayerRow from "./PlayerRow";
import GameControls from "./GameControls";

const App = () => {
  return (
    <div className="screen pt-20">
      <GameControls />
      <div className="flex flex-col space-y-1 mt-1">
        <PlayerRow />
        <PlayerRow />
        <PlayerRow />
        <PlayerRow />
      </div>
    </div>
  );
};

export default App;
