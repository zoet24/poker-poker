import { useContext } from "react";
import BettingContext from "../../contexts/BettingContext";

const Pot = () => {
  const { pot } = useContext(BettingContext);

  return (
    <div className="absolute centered box h-20 w-20 p-2 rounded-full flex items-end justify-center !top-full -z-10">
      £{pot.toFixed(2)}
    </div>
  );
};

export default Pot;
