const PlayerRow = () => {
  return (
    <div className="container justify-between">
      <div className="flex">
        <div className="border w-20 h-20 rounded-full flex items-center justify-center">
          Zoe
        </div>
        <div className="border w-10 h-10 rounded-full flex items-center justify-center self-center ml-[-16px] bg-black text-white">
          10
        </div>
      </div>
      <div className="player-cards">
        <div className="player-card player-card--1">
          <div className="card"></div>
        </div>
        <div className="player-card player-card--2">
          <div className="card"></div>
        </div>
        <div className="best-card best-card--1">
          <div className="card card--square"></div>
        </div>
        <div className="best-card best-card--2">
          <div className="card card--square"></div>
        </div>
        <div className="best-card best-card--3">
          <div className="card card--square"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4>Full House</h4>
        <p>457</p>
      </div>
    </div>
  );
};

export default PlayerRow;
