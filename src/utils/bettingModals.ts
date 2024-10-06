import { Player } from "../types/players";

// Function to open the bet modal for a specific player
export const openPlaceBetModal = (
  player: Player | undefined,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<string, { open: boolean; resolve?: (betAmount: number) => void }>
    >
  >
): Promise<number> => {
  return new Promise((resolve) => {
    if (!player) {
      console.error("Player is undefined or null, cannot open modal");
      resolve(0); // Resolve immediately with 0 if the player is invalid
      return;
    }

    if (!player.hasFolded) {
      // Only open the modal if the player has not folded
      setPlaceBetModalState((prevState) => ({
        ...prevState,
        [player.name]: { open: true, resolve },
      }));
    } else {
      // Automatically resolve the promise if the player has folded
      resolve(0);
    }
  });
};

// Function to close the bet modal for a specific player
export const closePlaceBetModal = (
  playerName: string,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<string, { open: boolean; resolve?: (betAmount: number) => void }>
    >
  >,
  betAmount: number
) => {
  setPlaceBetModalState((prevState) => {
    const playerState = prevState[playerName];
    if (playerState?.resolve) {
      playerState.resolve(betAmount); // Resolve with the bet amount
    }
    return {
      ...prevState,
      [playerName]: { open: false },
    };
  });
};
