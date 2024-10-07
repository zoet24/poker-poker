import { Player } from "../types/players";

// Function to open the bet modal for a specific player
export const openPlaceBetModal = (
  player: Player | undefined,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          open: boolean;
          resolve?: (result: { betAmount: number; hasFolded: boolean }) => void;
        }
      >
    >
  >
): Promise<{ betAmount: number; hasFolded: boolean }> => {
  return new Promise((resolve) => {
    if (!player) {
      console.error("Player is undefined or null, cannot open modal");
      resolve({ betAmount: 0, hasFolded: false });
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
      resolve({ betAmount: 0, hasFolded: true });
    }
  });
};

// Function to close the bet modal for a specific player
export const closePlaceBetModal = (
  playerName: string,
  setPlaceBetModalState: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          open: boolean;
          resolve?: (result: { betAmount: number; hasFolded: boolean }) => void;
        }
      >
    >
  >,
  result: { betAmount: number; hasFolded: boolean }
) => {
  setPlaceBetModalState((prevState) => {
    const playerState = prevState[playerName];
    if (playerState?.resolve) {
      playerState.resolve(result);
    }
    return {
      ...prevState,
      [playerName]: { open: false },
    };
  });
};
