import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import StageContext from "./StageContext";
import { Player } from "types/players";
import PlayersContext from "./PlayersContext";

// Define the shape of the PlayersContext data
interface BettingContextProps {
  pot: number;
  setPot: React.Dispatch<React.SetStateAction<number>>;
  takePlayerBets: () => void;
}

// Default values for the context
const defaultValue: BettingContextProps = {
  pot: 0,
  setPot: () => {},
  takePlayerBets: () => {},
};

// Create the context
const BettingContext = createContext<BettingContextProps>(defaultValue);

// Create the provider
export const BettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pot, setPot] = useState<number>(0);
  const { stage } = useContext(StageContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const takePlayerBets = () => {
    setPlayers((prevPlayers: Player[]) =>
      prevPlayers.map((player) => {
        if (player.hasFolded) {
          return player;
        }

        const updatedMoney = Math.max(0, player.money - 0.2);
        return { ...player, money: updatedMoney };
      })
    );

    const totalContribution = players.length * 0.2;
    setPot((prevPot) => prevPot + totalContribution);
  };

  // Use effect to handle stage change
  useEffect(() => {
    // Deduct money from players each time the stage changes
    if (stage && stage !== "pre-deal" && stage !== "showdown") {
      takePlayerBets();
    }

    if (stage === "showdown") {
      // Show all players' cards
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          showCards: true,
        }))
      );

      // Find the highest rank among all non-folded players
      const highestRank = players.reduce((max, player) => {
        if (!player.hasFolded && player.bestHand?.rank !== undefined) {
          return Math.max(max, player.bestHand.rank);
        }
        return max;
      }, 0);

      // Find all players who have the highest rank
      const winners = players.filter(
        (player) => player.bestHand?.rank === highestRank
      );

      if (winners.length > 0) {
        // Split the pot equally among the winners
        const potShare = pot / winners.length;

        // Update players' money with their share of the pot
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            winners.some((winner) => winner.name === player.name)
              ? { ...player, money: player.money + potShare }
              : player
          )
        );

        // Reset the pot after distributing the winnings
        setPot(0);
      }
    }
  }, [stage]);

  return (
    <BettingContext.Provider
      value={{
        pot,
        setPot,
        takePlayerBets,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export default BettingContext;
