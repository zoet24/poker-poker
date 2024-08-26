import LayoutContext from "contexts/LayoutContext";
import { useContext } from "react";
import Chip from "../Chip";

interface PlayerRowProps {
  name?: string;
  potValue?: number;
  hand?: string;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
  name = "Zoe",
  potValue = 10,
  hand = "High Card",
}) => {
  const { showCards } = useContext(LayoutContext);

  return (
    <div className="container">
      <div className="flex">
        <div className="border w-20 h-20 rounded-full flex items-center justify-center">
          {name}
        </div>
        <div
          className={`border w-10 h-10 rounded-full flex items-center justify-center self-center ml-[-16px] bg-black text-white overflow-hidden`}
        >
          <div
            className={`w-full text-center transform transition-transform duration-500 ${
              showCards ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {potValue}
          </div>
        </div>
      </div>
      <div className="overflow-hidden w-full relative">
        <div
          className={`flex justify-between transform transition-transform duration-500 ${
            showCards ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pl-2 player-cards">
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
          <div className="flex flex-col items-center justify-center w-28">
            <h4>{hand}</h4>
            <p>457</p>
          </div>
        </div>
        <div
          className={`bg-white absolute top-0 left-0 right-0 h-full flex items-center justify-center transform transition-transform duration-500 ${
            showCards ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="space-x-1 flex">
            <Chip size="sm" />
            <Chip size="sm" />
            <Chip size="sm" />
            <Chip size="sm" />
            <Chip size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRow;
