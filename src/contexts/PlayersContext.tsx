import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "../types/players";
import { createNewPlayer, initialPlayers, rotateRoles } from "../utils/players";
import { handleToastError } from "../utils/toasts";
import StageContext from "./StageContext";

interface PlayersContextProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  resetPlayers: () => void;
  resetPlayersHands: () => void;
  toggleShowCards: (index: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (playerIndex: number) => void;
  rotatePlayerRoles: () => void;
  rolesUpdated: boolean;
  setRolesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: PlayersContextProps = {
  players: initialPlayers,
  setPlayers: () => {},
  resetPlayers: () => {},
  resetPlayersHands: () => {},
  toggleShowCards: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
  rotatePlayerRoles: () => {},
  rolesUpdated: false,
  setRolesUpdated: () => {},
};

const PlayersContext = createContext<PlayersContextProps>(defaultValue);

export const PlayersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rolesUpdated, setRolesUpdated] = useState(false);
  const { stage } = useContext(StageContext);

  // Function to reset players to their initial state
  const resetPlayers = () => {
    setPlayers(initialPlayers);
  };

  // Function to reset players' hands to an empty array
  const resetPlayersHands = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => ({
        ...player,
        hand: [],
        bestHand: null,
        showCards: player.isComp ? false : true,
        hasFolded: false,
      }))
    );
  };

  // Toggle the 'showCards' state for a player at a given index
  const toggleShowCards = (index: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, showCards: !player.showCards } : player
      )
    );
  };

  const addPlayer = (name: string) => {
    const newPlayer = createNewPlayer(name);
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, newPlayer];
      return rotateRoles(updatedPlayers, true);
    });
  };

  const removePlayer = (playerIndex: number) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.filter(
        (_, index) => index !== playerIndex
      );

      // Check if any role (D, b, B) is missing after removal
      const dealerExists = updatedPlayers.some(
        (player) => player.role.isDealer
      );
      const smallBlindExists = updatedPlayers.some(
        (player) => player.role.isSmallBlind
      );

      // Handle 2-player case: no big blind needed
      if (updatedPlayers.length === 2) {
        if (!dealerExists || !smallBlindExists) {
          return rotateRoles(updatedPlayers, true);
        }
      } else {
        // Handle 3 or more players
        const bigBlindExists = updatedPlayers.some(
          (player) => player.role.isBigBlind
        );
        if (!dealerExists || !smallBlindExists || !bigBlindExists) {
          return rotateRoles(updatedPlayers, true);
        }
      }

      return updatedPlayers;
    });
  };

  // Function to rotate player roles normally
  const rotatePlayerRoles = () => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = rotateRoles(prevPlayers);
      setRolesUpdated(true);
      return updatedPlayers;
    });
  };

  useEffect(() => {
    if (stage === "pre-deal") {
      for (let i = players.length - 1; i >= 0; i--) {
        if (players[i].money <= 0) {
          removePlayer(i);
          handleToastError(`${players[i].name} is all outta cash!`);
        }
      }
    }

    console.log("Players: ", players);
  }, [stage]);

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        resetPlayers,
        resetPlayersHands,
        toggleShowCards,
        addPlayer,
        removePlayer,
        rotatePlayerRoles,
        rolesUpdated,
        setRolesUpdated,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
