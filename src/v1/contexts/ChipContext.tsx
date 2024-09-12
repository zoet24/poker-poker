import React, { createContext, useState, ReactNode } from "react";
import { Player, players } from "./PlayersContext";

// Define the shape of the context data
interface ChipContextProps {
  chipValues: number[];
  setChipValues: (newChipValues: number[]) => void;
  updateChipValues: (index: number, newValue: number) => void;
  // chipNum: number[];
  // setChipNum: (newChipNum: number[]) => void;
  // updateChipNum: (index: number, newNum: number) => void;
}

// Provide a default value for the context
const defaultValue: ChipContextProps = {
  chipValues: [1, 2, 10, 25, 50],
  setChipValues: () => {},
  updateChipValues: () => {},
  // chipNum: [1, 2, 10, 25, 50],
  // setChipNum: () => {},
  // updateChipNum: () => {},
};

const ChipContext = createContext<ChipContextProps>(defaultValue);

// Create a provider component
export const ChipProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chipValues, setChipValues] = useState<number[]>(
    defaultValue.chipValues
  );
  const updateChipValues = (index: number, newValue: number) => {
    setChipValues((prevChipValues) => {
      const updatedChipValues = [...prevChipValues];
      updatedChipValues[index] = newValue;
      return updatedChipValues;
    });
  };

  const chipVals: number[] = [1, 2, 10, 25, 50];
  const chipNums: number[] = [100, 100, 40, 40, 25];
  const initChipVal: number = 500;

  interface ChipDistribution {
    chip1: number;
    chip2: number;
    chip3: number;
    chip4: number;
    chip5: number;
  }

  function distributeChips(players: Player[]): ChipDistribution[] | null {
    let firstValidDistribution: ChipDistribution[] | null = null;

    function recurse(
      playerIndex: number,
      currentDistribution: ChipDistribution[],
      remainingChips: number[]
    ): boolean {
      // Base case: if all players have been assigned chips
      if (playerIndex === players.length) {
        firstValidDistribution = [...currentDistribution];
        return true; // Found a valid solution, stop recursion
      }

      // Iterate over possible chip combinations for the current player
      for (let aPlayer = 10; aPlayer <= remainingChips[0]; aPlayer++) {
        // Minimum 10 chip1s
        for (let bPlayer = 10; bPlayer <= remainingChips[1]; bPlayer++) {
          // Minimum 10 chip2s
          for (let cPlayer = 5; cPlayer <= remainingChips[2]; cPlayer++) {
            // Minimum 5 chip3s
            for (let dPlayer = 3; dPlayer <= remainingChips[3]; dPlayer++) {
              // Minimum 3 chip4s
              for (let ePlayer = 2; ePlayer <= remainingChips[4]; ePlayer++) {
                // Minimum 2 chip5s
                let playerTotal =
                  aPlayer * chipVals[0] +
                  bPlayer * chipVals[1] +
                  cPlayer * chipVals[2] +
                  dPlayer * chipVals[3] +
                  ePlayer * chipVals[4];

                // If the player's chip total matches the initChipVal, continue
                if (playerTotal === initChipVal) {
                  // Create the player's distribution object
                  const playerChips: ChipDistribution = {
                    chip1: aPlayer,
                    chip2: bPlayer,
                    chip3: cPlayer,
                    chip4: dPlayer,
                    chip5: ePlayer,
                  };

                  // Move to the next player with the updated remaining chips
                  const found = recurse(
                    playerIndex + 1,
                    [...currentDistribution, playerChips],
                    [
                      remainingChips[0] - aPlayer,
                      remainingChips[1] - bPlayer,
                      remainingChips[2] - cPlayer,
                      remainingChips[3] - dPlayer,
                      remainingChips[4] - ePlayer,
                    ]
                  );

                  // If a valid solution has been found, return immediately
                  if (found) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }

      return false; // No valid solution found at this branch
    }

    // Start recursion with the first player
    recurse(0, [], [...chipNums]);

    return firstValidDistribution;
  }

  const result = distributeChips(players);
  console.log("Result", result);

  return (
    <ChipContext.Provider
      value={{
        chipValues,
        setChipValues,
        updateChipValues,
        // chipNum,
        // setChipNum,
        // updateChipNum,
      }}
    >
      {children}
    </ChipContext.Provider>
  );
};

export default ChipContext;
