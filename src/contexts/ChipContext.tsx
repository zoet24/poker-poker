import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface ChipContextProps {
  chipValues: number[];
  setChipValues: (newChipValues: number[]) => void;
  updateChipValues: (index: number, newValue: number) => void;
}

// Provide a default value for the context
const defaultValue: ChipContextProps = {
  chipValues: [1, 2, 10, 25, 50],
  setChipValues: () => {},
  updateChipValues: () => {},
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

  console.log(chipValues);

  return (
    <ChipContext.Provider
      value={{ chipValues, setChipValues, updateChipValues }}
    >
      {children}
    </ChipContext.Provider>
  );
};

export default ChipContext;
