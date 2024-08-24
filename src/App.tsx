import React from "react";
import PlayerRow from "./PlayerRow";

const App = () => {
  return (
    <div className="screen">
      <div className="flex flex-col space-y-1">
        <PlayerRow />
        <PlayerRow />
        <PlayerRow />
      </div>
    </div>
  );
};

export default App;
