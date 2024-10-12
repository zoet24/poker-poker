import { Card } from "../types/cards";
import { Player } from "../types/players";
import { GameStage } from "../types/stage";
import { burnCard, dealToCommunity, drawCardFromDeck } from "./deck";
import { evaluateBestHand } from "./hands";
import { roundToTwoDecimals } from "./helpers";
import { rotateRoles } from "./players";
import { handleToastSuccess } from "./toasts";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Handles stage transitions like dealing cards and updating the deck
 */
export const handleStageTransition = (
  stage: GameStage,
  players: Player[],
  setPlayers: SetState<Player[]>,
  localDeck: Card[],
  addToCommunity: (cards: Card[]) => void,
  addToBurn: (card: Card) => void
): Card[] => {
  if (stage === "deal") {
    localDeck = dealInitialCardsToPlayers(players, setPlayers, localDeck);
  }

  if (stage === "flop" || stage === "turn" || stage === "river") {
    localDeck = burnAndDealCommunityCards(
      stage,
      localDeck,
      addToBurn,
      addToCommunity
    );
  }

  return localDeck;
};

/**
 * Deals initial cards to each player
 */
export const dealInitialCardsToPlayers = (
  players: Player[],
  setPlayers: SetState<Player[]>,
  deck: Card[]
): Card[] => {
  let localDeck = [...deck];
  const updatedPlayers = players.map((player) => {
    const newHand = [...player.hand];
    for (let i = 0; i < 2; i++) {
      const [card, newLocalDeck] = drawCardFromDeck(localDeck);
      localDeck = newLocalDeck;
      if (card) newHand.push(card);
    }
    return { ...player, hand: newHand };
  });

  setPlayers(updatedPlayers);
  return localDeck;
};

/**
 * Handles burning a card and dealing community cards based on the game stage
 */
export const burnAndDealCommunityCards = (
  stage: GameStage,
  deck: Card[],
  addToBurn: (card: Card) => void,
  addToCommunity: (cards: Card[]) => void
): Card[] => {
  let localDeck = [...deck];
  const numberToDeal = stage === "flop" ? 3 : 1;

  localDeck = burnCard(localDeck, addToBurn);
  localDeck = dealToCommunity(numberToDeal, localDeck, addToCommunity);

  return localDeck;
};

/**
 * Evaluates the best hand for each player based on the community cards
 */
export const evaluatePlayersHands = (
  players: Player[],
  communityCards: Card[],
  setPlayers: SetState<Player[]>
) => {
  const updatedPlayers = players.map((player) => ({
    ...player,
    bestHand: evaluateBestHand(player.hand, communityCards),
  }));

  setPlayers(updatedPlayers);
};

/**
 * Determines the winner(s) and distributes the pot among them
 */
export const determineWinnersAndDistributePot = (
  players: Player[],
  pot: number,
  setPlayers: SetState<Player[]>,
  setPot: SetState<number>
) => {
  setPlayers((prevPlayers) =>
    prevPlayers.map((player) => ({ ...player, showCards: true }))
  );

  const highestRank = players.reduce(
    (max, player) =>
      !player.hasFolded && player.bestHand?.rank !== undefined
        ? Math.max(max, player.bestHand.rank)
        : max,
    0
  );

  let winners = players.filter((player) => !player.hasFolded);

  if (winners.length > 1) {
    winners = players.filter(
      (player) => !player.hasFolded && player.bestHand?.rank === highestRank
    );
  }

  if (winners.length > 0) {
    const potShare = pot / winners.length;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        winners.some((winner) => winner.name === player.name)
          ? { ...player, money: roundToTwoDecimals(player.money + potShare) }
          : player
      )
    );

    winners.forEach((winner) =>
      handleToastSuccess(
        `${winner.name} wins £${potShare.toFixed(2)}${
          winner.bestHand?.rankName ? ` with ${winner.bestHand.rankName}` : ""
        }!`
      )
    );

    setPot(0);
  }
};

/**
 * Updates the player's current bet and remaining money
 */
export const updatePlayerBetAndMoney = (
  playerIndex: number,
  betAmount: number,
  setPlayers: SetState<Player[]>
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

/**
 * Handles blinds, rotating player roles, and updating the pot with the blinds
 */
export const handleBlinds = (
  players: Player[],
  setPlayers: SetState<Player[]>,
  setPot: SetState<number>,
  smallBlind: number,
  bigBlind: number,
  rotatePlayers: boolean
) => {
  const updatedPlayers = rotatePlayers ? rotateRoles(players) : players;
  setPlayers(updatedPlayers);

  const smallBlindPlayer = updatedPlayers.find(
    (player) => player.role.isSmallBlind
  );
  const bigBlindPlayer = updatedPlayers.find(
    (player) => player.role.isBigBlind
  );

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

  handleBlind(smallBlindPlayer, smallBlind);
  handleBlind(bigBlindPlayer, bigBlind);
};

/**
 * Handles the betting phase, managing raises and calls for both human and computer players
 */
export const handleBets = async (
  players: Player[],
  openPlaceBetModal: (
    player: Player
  ) => Promise<{ betAmount: number; hasFolded: boolean }>,
  setPlayers: SetState<Player[]>,
  setPot: SetState<number>,
  minimumBet: number,
  setMinimumBet: SetState<number>
) => {
  let currentPlayers = players.map((player, index) => ({
    ...player,
    originalIndex: index,
  }));

  let isRaise = false;
  let playerArrayLength = currentPlayers.length;
  let currentMinimumBet = minimumBet;
  let lastRaiserIndex = -1;

  do {
    isRaise = false;

    for (let i = 0; i < playerArrayLength; i++) {
      const currentPlayer = currentPlayers[i];

      if (lastRaiserIndex === i || currentPlayer.money === 0) continue;

      setMinimumBet(currentMinimumBet - currentPlayer.currentBet);

      let betAmount = 0;
      let hasFolded = false;

      if (currentPlayer.isComp) {
        if (currentMinimumBet === 0) {
          betAmount = 0; // Check if no minimum bet
        } else if (
          currentPlayer.money >=
          currentMinimumBet - currentPlayer.currentBet
        ) {
          betAmount = currentMinimumBet - currentPlayer.currentBet; // Call
        } else {
          hasFolded = true; // Fold if unable to match bet
        }
      } else {
        ({ betAmount, hasFolded } = await openPlaceBetModal(currentPlayer));
      }

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

      setPot((prevPot) => prevPot + betAmount);

      updatePlayerBetAndMoney(
        currentPlayer.originalIndex,
        betAmount,
        setPlayers
      );

      currentPlayers[i] = {
        ...currentPlayer,
        currentBet: currentPlayer.currentBet + betAmount,
        money: roundToTwoDecimals(Math.max(0, currentPlayer.money - betAmount)),
      };

      if (currentPlayers[i].currentBet > currentMinimumBet) {
        isRaise = true;
        currentMinimumBet = currentPlayers[i].currentBet;
        lastRaiserIndex = currentPlayers.length - 1;

        currentPlayers = [
          ...currentPlayers.slice(i + 1),
          ...currentPlayers.slice(0, i + 1),
        ];

        i = -1;
        break;
      }
    }
  } while (isRaise);

  setPlayers((prevPlayers) =>
    prevPlayers.map((p) => ({
      ...p,
      currentBet: 0,
    }))
  );
};
