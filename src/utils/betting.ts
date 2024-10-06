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

        // console.log("Betting - player: ", player.name, betAmount, player.money);

        return {
          ...player,
          money: Math.max(0, updatedMoney),
          currentBet: (player.currentBet ?? 0) + betAmount,
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

export const resetPlayersBets = (
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
) => {
  setPlayers((prevPlayers) =>
    prevPlayers.map((player) => ({
      ...player,
      currentBet: 0,
    }))
  );
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

export const handleStageBets = async (
  players: Player[],
  openPlaceBetModal: (player: Player) => Promise<void>,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>,
  smallBlind: number,
  bigBlind: number,
  isDeal: boolean = false
) => {
  const activePlayers = players.filter((player) => !player.hasFolded);

  const bigBlindIndex = activePlayers.findIndex(
    (player) => player.role.isBigBlind
  );
  const startIndex = (bigBlindIndex + 1) % activePlayers.length; // Start taking bets after the big blind

  for (let i = 0; i < activePlayers.length; i++) {
    const currentPlayer =
      activePlayers[(startIndex + i) % activePlayers.length];

    console.log("Betting - current player: ", currentPlayer.name);

    // Skip players without money or who have already bet in this round
    if (currentPlayer.money === 0) {
      continue;
    }

    console.log("Betting, isDeal", isDeal);

    if (isDeal && currentPlayer.role.isSmallBlind) {
      // Small blind needs to put in an additional amount to match big blind
      const additionalBet = bigBlind - smallBlind; // 0.1 already paid
      const originalIndex = players.findIndex(
        (p) => p.name === currentPlayer.name
      );
      if (additionalBet > 0) {
        takePlayerBet(originalIndex, additionalBet, setPlayers, setPot);
      }
    } else if (isDeal && currentPlayer.role.isBigBlind) {
      // Big blind has already paid the minimum, no action needed
      continue;
    } else {
      // All other players must put in the big blind amount or fold
      if (currentPlayer.isComp) {
        const originalIndex = players.findIndex(
          (p) => p.name === currentPlayer.name
        );
        takePlayerBet(originalIndex, 0.2, setPlayers, setPot);
      } else {
        await openPlaceBetModal(currentPlayer);
      }
    }

    console.log(
      "Betting - player: ",
      currentPlayer.name,
      currentPlayer.currentBet
    );
  }
};
