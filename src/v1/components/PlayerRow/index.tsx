import LayoutContext from "v1/contexts/LayoutContext";
import { useContext, useState } from "react";
import Chip from "../Chip";
import ChipContext from "v1/contexts/ChipContext";

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
  const { chipValues, updateChipValues } = useContext(ChipContext);

  const [playerChipValues, setPlayerChipValues] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  const handleChipChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        setPlayerChipValues((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[index] = newValue * chipValues[index]; // Multiply by the context value
          return updatedValues;
        });
      }
    };

  const playerPotValue = playerChipValues.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  return (
    <div className="container">
      <div className="flex">
        <div className="border w-20 h-20 rounded-full flex items-center justify-center">
          {name}
        </div>
        <div
          className={`border w-10 h-10 rounded-full flex items-center justify-center self-center ml-[-16px] bg-black text-white overflow-hidden relative`}
        >
          <div
            className={`w-full text-center transform transition-transform duration-500 text-xs ${
              showCards ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            £{(potValue / 100).toFixed(2)}
          </div>
          <div
            className={`w-full text-center absolute left-0 transform transition-transform duration-500 text-xs ${
              showCards ? "translate-x-full" : "translate-x-0"
            }`}
          >
            £{(playerPotValue / 100).toFixed(2)}
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
            {playerChipValues.map((value, index) => (
              <Chip
                key={index}
                size="sm"
                value={value}
                onChange={handleChipChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRow;
