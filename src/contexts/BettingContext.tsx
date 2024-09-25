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
        const updatedMoney = Math.max(0, player.money - 0.2); // Deduct 20p but ensure no negative balance
        return { ...player, money: updatedMoney };
      })
    );

    const totalContribution = players.length * 0.2; // Calculate the total contribution to the pot
    setPot((prevPot) => prevPot + totalContribution); // Add the contribution to the pot
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
          showCards: true, // Set showCards to true for all players
        }))
      );

      const winner = players.reduce((prev, curr) => {
        // Ensure both players have a valid bestHand and rank
        if (prev.bestHand?.rank === undefined) return curr;
        if (curr.bestHand?.rank === undefined) return prev;

        return prev.bestHand.rank > curr.bestHand.rank ? prev : curr;
      });

      if (winner) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.name === winner.name
              ? { ...player, money: player.money + pot } // Award the pot to the winner
              : player
          )
        );
        setPot(0); // Reset the pot after the showdown
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
