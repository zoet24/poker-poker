import { Player } from "../types/players";

// Function to take a player's bet
export const handleBet = (
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
          currentBet: (player.currentBet ?? 0) + betAmount,
        };
      }
      return player;
    })
  );

  setPot((prevPot) => prevPot + betAmount);
};

export const handleBets = async (
  players: Player[],
  openPlaceBetModal: (player: Player) => Promise<number>,
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setPot: React.Dispatch<React.SetStateAction<number>>
) => {
  let currentPlayers = [...players];
  let isRaise = false;
  let playerArrayLength = currentPlayers.length;
  let currentMinimumBet = 0;
  let lastRaiserIndex = -1;

  // Use a while loop to continue betting until no raises occur
  do {
    isRaise = false; // Reset the raise flag at the start of each round

    for (let i = 0; i < playerArrayLength; i++) {
      const currentPlayer = currentPlayers[i];

      if (lastRaiserIndex === i) {
        continue;
      }

      // Open the betting modal and get the player's bet amount
      const betAmount = await openPlaceBetModal(currentPlayer);

      setPot((prevPot) => prevPot + betAmount);

      // Update currentPlayers from the latest state
      currentPlayers = currentPlayers.map((p, index) =>
        index === i
          ? {
              ...p,
              currentBet: p.currentBet + betAmount,
              money: Math.max(0, p.money - betAmount),
            }
          : p
      );

      console.log(
        "handleBets - player, currentBet, money: ",
        i,
        currentPlayers[i].name,
        currentPlayers[i].currentBet,
        currentPlayers[i].money
      );

      console.log("handleBets - current players", currentPlayers);

      // Check if the player has raised
      if (currentPlayers[i].currentBet > currentMinimumBet) {
        console.log(
          "handleBets - player: ",
          currentPlayers[i].name,
          " has raised from ",
          currentMinimumBet
        );

        isRaise = true; // Player raised
        currentMinimumBet = currentPlayers[i].currentBet;
        lastRaiserIndex = currentPlayers.length - 1;

        console.log(
          "handleBets - currentMinimumBet is now ",
          currentMinimumBet
        );

        currentPlayers = [
          ...currentPlayers.slice(i + 1),
          ...currentPlayers.slice(0, i + 1),
        ];

        i = 0;

        console.log(
          "handleBets - reshuffled players order: ",
          currentPlayers.map((p) => p.name)
        );

        // Exit the for loop early to restart from the next player after a raise
        break;
      }
    }
  } while (isRaise); // Repeat the loop if a raise occurred
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
// export const handleBlinds = (
//   players: Player[],
//   setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
//   setPot: React.Dispatch<React.SetStateAction<number>>,
//   smallBlind: number,
//   bigBlind: number
// ) => {
//   const smallBlindPlayer = players.find((player) => player.role.isSmallBlind);
//   const bigBlindPlayer = players.find((player) => player.role.isBigBlind);

//   if (smallBlindPlayer) {
//     const smallBlindIndex = players.findIndex(
//       (p) => p.name === smallBlindPlayer.name
//     );
//     takePlayerBet(smallBlindIndex, smallBlind, setPlayers, setPot);
//   }

//   if (bigBlindPlayer) {
//     const bigBlindIndex = players.findIndex(
//       (p) => p.name === bigBlindPlayer.name
//     );
//     takePlayerBet(bigBlindIndex, bigBlind, setPlayers, setPot);
//   }
// };

// export const handleStageBets = async (
//   players: Player[],
//   openPlaceBetModal: (player: Player) => Promise<void>,
//   setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
//   setPot: React.Dispatch<React.SetStateAction<number>>,
//   smallBlind: number,
//   bigBlind: number,
//   minimumBet: number,
//   isDeal: boolean = false
// ) => {
//   const activePlayers = players.filter((player) => !player.hasFolded);
//   let minBet = 0;

//   for (let i = 0; i < activePlayers.length; i++) {
//     // To start off with:
//     // Iterate over each player - open the place bet modal, take their bet and move on to the next player (make sure state is getting updated correctly)
//     // Added complexity
//     // If playerBet = minBet, the player has checked - proceed to the next player
//     // If playerBet > minBet, the player has raised - increase minBet, break for loop and start again from next player
//     // If playerBet < minBet, collect the difference so the player stays in
//     // Then when this is working add blinds, isComp etc back in (maybe in smaller functions?)
//   }
// };

// export const handleStageBets = async (
//   players: Player[],
//   openPlaceBetModal: (player: Player) => Promise<void>,
//   setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
//   setPot: React.Dispatch<React.SetStateAction<number>>,
//   smallBlind: number,
//   bigBlind: number,
//   minimumBet: number,
//   isDeal: boolean = false
// ) => {
//   const activePlayers = players.filter((player) => !player.hasFolded);

//   const bigBlindIndex = activePlayers.findIndex(
//     (player) => player.role.isBigBlind
//   );
//   const startIndex = (bigBlindIndex + 1) % activePlayers.length; // Start taking bets after the big blind

//   for (let i = 0; i < activePlayers.length; i++) {
//     const currentPlayer =
//       activePlayers[(startIndex + i) % activePlayers.length];

// let isRaise = false;
// let currentMinimumBet = minimumBet;

//     // Skip players without money or who have already bet in this round
//     if (currentPlayer.money === 0) {
//       continue;
//     }

//     if (isDeal) {
//       if (currentPlayer.role.isSmallBlind) {
//         const additionalBet = bigBlind - smallBlind; // 0.1 already paid
//         const originalIndex = players.findIndex(
//           (p) => p.name === currentPlayer.name
//         );
//         if (additionalBet > 0) {
//           takePlayerBet(originalIndex, additionalBet, setPlayers, setPot);
//         }

//         // console.log(
//         //   "Betting - current small blind player",
//         //   currentPlayer.name,
//         //   currentMinimumBet
//         // );
//       } else if (currentPlayer.role.isBigBlind) {
//         // console.log(
//         //   "Betting - current big blind player",
//         //   currentPlayer.name,
//         //   currentMinimumBet
//         // );
//         continue;
//       } else {
//         if (currentPlayer.isComp) {
//           const originalIndex = players.findIndex(
//             (p) => p.name === currentPlayer.name
//           );
//           takePlayerBet(originalIndex, currentMinimumBet, setPlayers, setPot);

//           // console.log(
//           //   "Betting - current computer player",
//           //   currentPlayer.name,
//           //   minimumBet
//           // );
//         } else {
//           await openPlaceBetModal(currentPlayer);
// if (currentPlayer.currentBet > currentMinimumBet) {
//   console.log(
//     "Betting - player: ",
//     currentPlayer.name,
//     " is raised from ",
//     currentMinimumBet
//   );

//   isRaise = true; // Player raised
//   currentMinimumBet = currentPlayer.currentBet;

//   console.log("currentMinimumBet is now ", currentMinimumBet);
// }
//         }
//       }
//     } else {
//       if (currentPlayer.isComp) {
//         const originalIndex = players.findIndex(
//           (p) => p.name === currentPlayer.name
//         );
//         takePlayerBet(originalIndex, currentMinimumBet, setPlayers, setPot);
//       } else {
//         await openPlaceBetModal(currentPlayer);
//         if (currentPlayer.currentBet > currentMinimumBet) {
//           console.log(
//             "Betting - player: ",
//             currentPlayer.name,
//             " is raised from ",
//             currentMinimumBet
//           );

//           isRaise = true; // Player raised
//           currentMinimumBet = currentPlayer.currentBet;

//           console.log("currentMinimumBet is now ", currentMinimumBet);
//         }
//       }
//     }

//     // console.log(
//     //   "Betting - player: ",
//     //   currentPlayer.name,
//     //   "Current bet is: ",
//     //   currentPlayer.currentBet,
//     //   "Current minimum bet is: ",
//     //   currentMinimumBet
//     // );
//   }

//   // resetPlayersBets(setPlayers);
// };

// export const handleStageBets = async (
//   players: Player[],
//   openPlaceBetModal: (player: Player) => Promise<void>,
//   setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
//   setPot: React.Dispatch<React.SetStateAction<number>>,
//   setMinimumBet: React.Dispatch<React.SetStateAction<number>>,
//   smallBlind: number,
//   bigBlind: number,
//   minimumBet: number,
//   isDeal: boolean = false
// ) => {
//   const activePlayers = players.filter((player) => !player.hasFolded);

//   let bigBlindIndex = activePlayers.findIndex(
//     (player) => player.role.isBigBlind
//   );
//   let startIndex = (bigBlindIndex + 1) % activePlayers.length; // Start taking bets after the big blind

//   let isRaise = false;
//   let currentMinimumBet = minimumBet;

//   do {
//     isRaise = false; // Reset raise flag at the start of each betting round

//     for (let i = 0; i < activePlayers.length; i++) {
//       const currentPlayer =
//         activePlayers[(startIndex + i) % activePlayers.length];

//       console.log("Betting - current player: ", currentPlayer.name);

//       // Skip players without money or who have already bet enough in this round
//       if (currentPlayer.money === 0) {
//         continue;
//       }

//       // Handle deal-specific small/big blind logic
//       if (isDeal) {
//         if (currentPlayer.role.isSmallBlind) {
//           const additionalBet = bigBlind - smallBlind; // 0.1 already paid
//           const originalIndex = players.findIndex(
//             (p) => p.name === currentPlayer.name
//           );
//           if (additionalBet > 0) {
//             takePlayerBet(originalIndex, additionalBet, setPlayers, setPot);
//           }
//         } else if (currentPlayer.role.isBigBlind) {
//           continue;
//         } else {
//           // For non-blind players during the deal round
//           if (currentPlayer.isComp) {
//             const originalIndex = players.findIndex(
//               (p) => p.name === currentPlayer.name
//             );
//             takePlayerBet(originalIndex, currentMinimumBet, setPlayers, setPot);
//           } else {
//             await openPlaceBetModal(currentPlayer);
//             if (currentPlayer.currentBet > currentMinimumBet) {
//               isRaise = true; // Player raised
//               currentMinimumBet = currentPlayer.currentBet;
//               setMinimumBet(currentMinimumBet);
//             }
//           }
//         }
//       } else {
//         // Normal betting rounds (flop, turn, river)
//         if (currentPlayer.isComp) {
//           const originalIndex = players.findIndex(
//             (p) => p.name === currentPlayer.name
//           );
//           takePlayerBet(originalIndex, currentMinimumBet, setPlayers, setPot);
//         } else {
//           await openPlaceBetModal(currentPlayer);
//           if (currentPlayer.currentBet > currentMinimumBet) {
//             isRaise = true; // Player raised
//             currentMinimumBet = currentPlayer.currentBet;
//             setMinimumBet(currentMinimumBet);
//           }
//         }
//       }

//       console.log(
//         "Betting - player: ",
//         currentPlayer.name,
//         currentPlayer.currentBet,
//         isRaise
//       );

//       // Update the start index to the next player if there's a raise
//       if (isRaise) {
//         startIndex =
//           (activePlayers.findIndex((p) => p.name === currentPlayer.name) + 1) %
//           activePlayers.length;
//       }
//     }

//     // Reset players' bets after each round of betting is completed
//     resetPlayersBets(setPlayers);
//   } while (isRaise); // Repeat until no more raises
// };
