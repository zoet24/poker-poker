import { Player } from "../types/players";

// Function to take a player's bet
export const takePlayerBet = (
  playerIndex: number,
  betAmount: number,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>
) => {
  setPlayers((prevPlayers) =>
    prevPlayers.map((player, index) => {
      if (index === playerIndex) {
        let updatedMoney = player.money - betAmount;
        updatedMoney = Math.max(0, Math.round(updatedMoney * 100) / 100);

        return {
          ...player,
          money: Math.max(0, updatedMoney),
        };
      }
      return player;
    })
  );

  setPot((prevPot) => prevPot + betAmount);
};

// Function to take bets from all active players
export const takePlayersBets = async (
  players: Player[],
  openBetModal: (player: Player) => Promise<void>,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>
) => {
  const activePlayers = players.filter((player) => !player.hasFolded);

  const activeSmallBlindIndex = activePlayers.findIndex(
    (player) => player.role.isSmallBlind
  );

  const startIndex = activeSmallBlindIndex !== -1 ? activeSmallBlindIndex : 0;

  // Iterate over active players starting from the small blind
  for (let i = 0; i < activePlayers.length; i++) {
    const currentPlayer =
      activePlayers[(startIndex + i) % activePlayers.length];

    if (currentPlayer.money === 0) {
      continue;
    }

    // Check if the player is a computer or not
    if (currentPlayer.isComp) {
      const originalIndex = players.findIndex(
        (p) => p.name === currentPlayer.name
      );
      takePlayerBet(originalIndex, 0.2, setPlayers, setPot);
    } else {
      await openBetModal(currentPlayer);
    }
  }
};

// Function to handle blinds
export const handleBlinds = (
  players: Player[],
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>,
  smallBlind: number,
  bigBlind: number,
  setMinimumBet: React.Dispatch<React.SetStateAction<number>>
) => {
  const smallBlindPlayer = players.find((player) => player.role.isSmallBlind);
  const bigBlindPlayer = players.find((player) => player.role.isBigBlind);

  // Set the minimum bet to the big blind value
  setMinimumBet(bigBlind);

  if (smallBlindPlayer) {
    const smallBlindIndex = players.findIndex(
      (p) => p.name === smallBlindPlayer.name
    );
    takePlayerBet(smallBlindIndex, smallBlind, setPlayers, setPot);
  }

  if (bigBlindPlayer) {
    const bigBlindIndex = players.findIndex(
      (p) => p.name === bigBlindPlayer.name
    );
    takePlayerBet(bigBlindIndex, bigBlind, setPlayers, setPot);
  }
};

// Function to handle the betting during the deal stage
export const handleDealBets = async (
  players: Player[],
  openPlaceBetModal: (player: Player) => Promise<void>,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  bigBlind: number,
  smallBlind: number,
  setPot: React.Dispatch<React.SetStateAction<number>>
) => {
  for (let i = 0; i < players.length; i++) {
    const currentPlayer = players[i];

    // Skip players who have folded
    if (currentPlayer.hasFolded) {
      continue;
    }

    if (currentPlayer.role.isSmallBlind) {
      // Small blind needs to put in an additional amount to match big blind
      const additionalBet = bigBlind - smallBlind; // 0.1 already paid
      if (additionalBet > 0) {
        takePlayerBet(i, additionalBet, setPlayers, setPot);
      }
    } else if (currentPlayer.role.isBigBlind) {
      // Big blind has already paid the minimum, no action needed
      continue;
    } else {
      // All other players must put in the big blind amount or fold
      if (currentPlayer.isComp) {
        // If it's a computer player, they automatically bet the required amount
        takePlayerBet(i, bigBlind, setPlayers, setPot);
      } else {
        // If it's a human player, open the bet modal
        await openPlaceBetModal(currentPlayer);
      }
    }
  }
};
