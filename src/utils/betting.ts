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
  bigBlind: number
) => {
  const smallBlindPlayer = players.find((player) => player.role.isSmallBlind);
  const bigBlindPlayer = players.find((player) => player.role.isBigBlind);

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
  minimumBet: number,
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

    if (isDeal) {
      if (currentPlayer.role.isSmallBlind) {
        const additionalBet = bigBlind - smallBlind; // 0.1 already paid
        const originalIndex = players.findIndex(
          (p) => p.name === currentPlayer.name
        );
        if (additionalBet > 0) {
          takePlayerBet(originalIndex, additionalBet, setPlayers, setPot);
        }
      } else if (currentPlayer.role.isBigBlind) {
        continue;
      } else {
        if (currentPlayer.isComp) {
          const originalIndex = players.findIndex(
            (p) => p.name === currentPlayer.name
          );
          takePlayerBet(originalIndex, minimumBet, setPlayers, setPot);

          console.log(
            "Betting - current computer player",
            currentPlayer.name,
            minimumBet
          );
        } else {
          await openPlaceBetModal(currentPlayer);
        }
      }
    } else {
      if (currentPlayer.isComp) {
        const originalIndex = players.findIndex(
          (p) => p.name === currentPlayer.name
        );
        takePlayerBet(originalIndex, minimumBet, setPlayers, setPot);
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
