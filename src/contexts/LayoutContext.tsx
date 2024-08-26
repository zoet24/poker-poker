import React, { createContext, useState, ReactNode } from "react";

interface LayoutContextProps {
  showCards: boolean;
  setShowCards: (showCards: boolean) => void;
}

const defaultValue: LayoutContextProps = {
  showCards: true,
  setShowCards: () => {},
};
const LayoutContext = createContext<LayoutContextProps>(defaultValue);

// Create a provider component
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showCards, setShowCards] = useState(true);

  return (
    <LayoutContext.Provider value={{ showCards, setShowCards }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
