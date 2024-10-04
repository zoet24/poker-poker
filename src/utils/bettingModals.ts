import { Player } from "../types/players";

// Function to open the bet modal for a specific player
export const openPlaceBetModal = (
  player: Player | undefined,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<string, { open: boolean; resolve?: () => void }>
    >
  >
): Promise<void> => {
  return new Promise((resolve) => {
    if (!player) {
      console.error("Player is undefined or null, cannot open modal");
      resolve(); // Resolve immediately if the player is invalid
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
      resolve();
    }
  });
};

// Function to close the bet modal for a specific player
export const closePlaceBetModal = (
  playerName: string,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<string, { open: boolean; resolve?: () => void }>
    >
  >
) => {
  setPlaceBetModalState((prevState) => {
    const playerState = prevState[playerName];
    if (playerState?.resolve) {
      playerState.resolve();
    }
    return {
      ...prevState,
      [playerName]: { open: false },
    };
  });
};
