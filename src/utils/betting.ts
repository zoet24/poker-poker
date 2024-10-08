import { Player } from "../types/players";
import { roundToTwoDecimals } from "./helpers";
import { rotateRoles } from "./players";

export const updatePlayerBetAndMoney = (
  playerIndex: number,
  betAmount: number,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
) => {
  setPlayers((prevPlayers) =>
    prevPlayers.map((player, index) =>
      index === playerIndex
        ? {
            ...player,
            currentBet: player.currentBet + betAmount,
            money: roundToTwoDecimals(Math.max(0, player.money - betAmount)),
          }
        : player
    )
  );
};

export const handleBlinds = (
  players: Player[],
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>,
  smallBlind: number,
  bigBlind: number,
  rotatePlayers: boolean
) => {
  // Rotate player roles if required
  const updatedPlayers = rotatePlayers ? rotateRoles(players) : players;
  setPlayers(updatedPlayers);

  // Find the small and big blind players
  const smallBlindPlayer = updatedPlayers.find(
    (player) => player.role.isSmallBlind
  );
  const bigBlindPlayer = updatedPlayers.find(
    (player) => player.role.isBigBlind
  );

  // Helper function to update the pot and player's bet
  const handleBlind = (
    blindPlayer: Player | undefined,
    blindAmount: number
  ) => {
    if (blindPlayer) {
      const blindIndex = updatedPlayers.findIndex(
        (p) => p.name === blindPlayer.name
      );
      updatePlayerBetAndMoney(blindIndex, blindAmount, setPlayers);
      setPot((prevPot) => prevPot + blindAmount);
    }
  };

  // Handle small and big blind bets
  handleBlind(smallBlindPlayer, smallBlind);
  handleBlind(bigBlindPlayer, bigBlind);
};

export const handleBets = async (
  players: Player[],
  openPlaceBetModal: (
    player: Player
  ) => Promise<{ betAmount: number; hasFolded: boolean }>,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>,
  minimumBet: number,
  setMinimumBet: React.Dispatch<React.SetStateAction<number>>
) => {
  // Add an originalIndex to each player to keep track of their original positions
  let currentPlayers = players.map((player, index) => ({
    ...player,
    originalIndex: index,
  }));
  let isRaise = false;
  let playerArrayLength = currentPlayers.length;
  let currentMinimumBet = minimumBet;
  let lastRaiserIndex = -1;

  // Use a while loop to continue betting until no raises occur
  do {
    isRaise = false; // Reset the raise flag at the start of each round

    for (let i = 0; i < playerArrayLength; i++) {
      const currentPlayer = currentPlayers[i];

      // Skip player if they were the person who raised or if they are all in
      if (lastRaiserIndex === i || currentPlayer.money === 0) {
        continue;
      }

      setMinimumBet(currentMinimumBet - currentPlayer.currentBet);

      let betAmount = 0;
      let hasFolded = false;

      if (currentPlayer.isComp) {
        // Computer player's decision logic
        if (currentMinimumBet === 0) {
          // If there's no current minimum bet, check
          betAmount = 0;
        } else if (
          currentPlayer.money >=
          currentMinimumBet - currentPlayer.currentBet
        ) {
          // Call if they have enough money
          betAmount = currentMinimumBet - currentPlayer.currentBet;
        } else {
          // Fold if they can't match the current bet
          hasFolded = true;
        }
      } else {
        // Human player's action via modal
        ({ betAmount, hasFolded } = await openPlaceBetModal(currentPlayer));
      }

      // Update the player's state if they folded
      if (hasFolded) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((p, index) =>
            index === currentPlayer.originalIndex
              ? { ...p, hasFolded: true }
              : p
          )
        );
        currentPlayers[i].hasFolded = true;
        continue;
      }

      // Update the pot with the bet amount
      setPot((prevPot) => prevPot + betAmount);

      // Update player's bet and money using the new utility function
      updatePlayerBetAndMoney(
        currentPlayer.originalIndex,
        betAmount,
        setPlayers
      );

      // Update currentPlayers with the new bet and money after the player's action
      currentPlayers[i] = {
        ...currentPlayer,
        currentBet: currentPlayer.currentBet + betAmount,
        money: roundToTwoDecimals(Math.max(0, currentPlayer.money - betAmount)),
      };

      // Check if the player has raised
      if (currentPlayers[i].currentBet > currentMinimumBet) {
        isRaise = true; // Player raised
        currentMinimumBet = currentPlayers[i].currentBet;
        lastRaiserIndex = currentPlayers.length - 1;

        // Reshuffle the players to start from the next one after the raiser
        currentPlayers = [
          ...currentPlayers.slice(i + 1),
          ...currentPlayers.slice(0, i + 1),
        ];

        i = -1;

        // Exit the for loop early to restart from the next player after a raise
        break;
      }
    }
  } while (isRaise); // Repeat the loop if a raise occurred

  // Reset all players' bets at the end of the round
  setPlayers((prevPlayers) =>
    prevPlayers.map((p) => ({
      ...p,
      currentBet: 0,
    }))
  );
};
