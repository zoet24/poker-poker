const PlayerAdd = () => {
  const addPlayer = () => {
    console.log("Add player");
  };

  return (
    <div className="container cursor-pointer" onClick={addPlayer}>
      <div className="flex">
        <div className="border border-dashed w-20 h-20 rounded-full flex items-center justify-center"></div>
        <div className="border border-dashed w-10 h-10 rounded-full flex items-center justify-center self-center ml-[-16px] bg-white overflow-hidden">
          <div className="w-full text-center transform transition-transform duration-500"></div>
        </div>
      </div>
      <div className="overflow-hidden w-full">
        <div className="flex justify-between transform transition-transform duration-500">
          <div className="pl-2 player-cards">
            <div className="player-card player-card--1">
              <div className="card border-dashed"></div>
            </div>
            <div className="player-card player-card--2">
              <div className="card border-dashed"></div>
            </div>
            <div className="best-card best-card--1">
              <div className="card card--square border-dashed"></div>
            </div>
            <div className="best-card best-card--2">
              <div className="card card--square border-dashed"></div>
            </div>
            <div className="best-card best-card--3">
              <div className="card card--square border-dashed"></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-28">
            <p>Add player</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAdd;
