import { Card } from "../types/cards";
import { Player } from "../types/players";
import { GameStage } from "../types/stage";
import { burnCard, dealToCommunity, drawCardFromDeck } from "./deck";
import { evaluateBestHand } from "./hands";
import { handleToastError, handleToastSuccess } from "./toasts";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const handleStageTransition = (
  stage: GameStage,
  players: Player[],
  setPlayers: SetState<Player[]>,
  localDeck: Card[],
  addToCommunity: (cards: Card[]) => void,
  addToBurn: (card: Card) => void,
  handleStageBets: () => Promise<void>,
  resetDeck: () => void,
  resetPlayersHands: () => void,
  rotatePlayerRoles: () => void,
  isInitialMount: React.MutableRefObject<boolean>,
  gameNumber: React.MutableRefObject<number>,
  removePlayer: (index: number) => void
): Card[] => {
  if (stage === "pre-deal") {
    resetDeck();
    resetPlayersHands();

    if (!isInitialMount.current) {
      gameNumber.current += 1;

      if (gameNumber.current > 1) {
        rotatePlayerRoles();
      }
    } else {
      isInitialMount.current = false;
    }

    players.forEach((player, index) => {
      if (player.money <= 0) {
        removePlayer(index);
        handleToastError(`${player.name} is all outta cash!`);
      }
    });
    return localDeck;
  }

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

export const dealInitialCardsToPlayers = (
  players: Player[],
  setPlayers: SetState<Player[]>,
  deck: Card[]
): Card[] => {
  let localDeck = [...deck];
  const updatedPlayers = players.map((player) => {
    let newHand = [...player.hand];
    for (let i = 0; i < 2; i++) {
      const [card, newLocalDeck] = drawCardFromDeck(localDeck);
      localDeck = newLocalDeck;
      if (card) {
        newHand.push(card);
      }
    }
    return { ...player, hand: newHand };
  });
  setPlayers(updatedPlayers);
  return localDeck;
};

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

export const evaluatePlayersHands = (
  players: Player[],
  communityCards: Card[],
  setPlayers: SetState<Player[]>
) => {
  const updatedPlayers = players.map((player) => {
    const bestHand = evaluateBestHand(player.hand, communityCards);
    return { ...player, bestHand };
  });
  setPlayers(updatedPlayers);
};

export const determineWinnersAndDistributePot = (
  players: Player[],
  pot: number,
  setPlayers: SetState<Player[]>,
  setPot: SetState<number>
) => {
  setPlayers((prevPlayers) =>
    prevPlayers.map((player) => ({
      ...player,
      showCards: true,
    }))
  );

  const highestRank = players.reduce((max, player) => {
    if (!player.hasFolded && player.bestHand?.rank !== undefined) {
      return Math.max(max, player.bestHand.rank);
    }
    return max;
  }, 0);

  let winners: Player[] = players.filter((player) => !player.hasFolded);

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
          ? { ...player, money: player.money + potShare }
          : player
      )
    );

    winners.forEach((winner) => {
      handleToastSuccess(
        `${winner.name} wins £${potShare.toFixed(2)}${
          winner.bestHand?.rankName ? ` with ${winner.bestHand.rankName}` : ""
        }!`
      );
    });

    setPot(0);
  }
};
