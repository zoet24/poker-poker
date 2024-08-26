const PlayerAdd = () => {
  return (
    <div className="container justify-between">
      <div className="flex">
        <div className="border border-dashed w-20 h-20 rounded-full flex items-center justify-center"></div>
        <div className="border border-dashed w-10 h-10 rounded-full flex items-center justify-center self-center ml-[-16px] bg-white"></div>
      </div>
      <div className="player-cards">
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
      <div className="flex flex-col items-center justify-center w-20">
        <h4>Beep</h4>
        <p>Boop</p>
      </div>
    </div>
  );
};

export default PlayerAdd;
