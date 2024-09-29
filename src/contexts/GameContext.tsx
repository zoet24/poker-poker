import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Player } from "../types/players";
import { burnCard, dealToCommunity, drawCardFromDeck } from "../utils/deck";
import { evaluateBestHand } from "../utils/game";
import { handleToastError, handleToastSuccess } from "../utils/toasts";
import BettingContext from "./BettingContext";
import CardsContext from "./CardsContext";
import PlayersContext from "./PlayersContext";
import StageContext from "./StageContext";

interface GameContextProps {
  handleEndGame: () => void;
  resetGame: () => void;
}

const defaultValue: GameContextProps = {
  handleEndGame: () => {},
  resetGame: () => {},
};

const GameContext = createContext<GameContextProps>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stage, resetStage, setStage } = useContext(StageContext);
  const {
    deck,
    communityCards,
    setDeck,
    resetDeck,
    addToCommunity,
    addToBurn,
  } = useContext(CardsContext);
  const {
    players,
    setPlayers,
    resetPlayersHands,
    resetPlayers,
    rotatePlayerRoles,
    rolesUpdated,
    setRolesUpdated,
    removePlayer,
  } = useContext(PlayersContext);
  const { pot, setPot, takePlayersBets, openPlaceBetModal, handleBlinds } =
    useContext(BettingContext);

  const gameNumber = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log("remaining players");
    const remainingPlayers = players.filter((player) => !player.hasFolded);
    if (remainingPlayers.length === 1 && stage !== "showdown") {
      setStage("showdown");
    }
  }, [players]);

  useEffect(() => {
    let localDeck = [...deck];

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

      return;
    }

    // Handle deal: deal two cards to each player
    else if (stage === "deal") {
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
    }

    // Handle flop: burn 1 card, deal 3 cards to community
    else if (stage === "flop") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(3, localDeck, addToCommunity);
      takePlayersBets(players, openPlaceBetModal);
    }

    // Handle turn: burn 1 card, deal 1 to community
    else if (stage === "turn") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
      takePlayersBets(players, openPlaceBetModal);
    }

    // Handle river: burn 1 card, deal 1 to community
    else if (stage === "river") {
      localDeck = burnCard(localDeck, addToBurn);
      localDeck = dealToCommunity(1, localDeck, addToCommunity);
      takePlayersBets(players, openPlaceBetModal);
    }

    // Handle end of game logic
    else if (stage === "showdown") {
      handleEndGame();
      // setPot(0);
    }

    // Update the global deck
    setDeck(localDeck);
  }, [stage]);

  useEffect(() => {
    if (stage === "flop" || stage === "turn" || stage === "river") {
      if (communityCards.length > 0) {
        // Wait until community cards are updated, then evaluate players' hands
        const updatedPlayers = players.map((player) => {
          const bestHand = evaluateBestHand(player.hand, communityCards);
          return { ...player, bestHand };
        });

        setPlayers(updatedPlayers);
      }
    }
  }, [communityCards]);

  const handleEndGame = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        showCards: true,
      }))
    );

    // Find the highest rank among all non-folded players
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
      // Split the pot equally among the winners
      const potShare = pot / winners.length;

      // Update players' money with their share of the pot
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

  const resetGame = () => {
    gameNumber.current = 0;
    setPot(0);
    resetDeck();
    resetPlayers();
    resetStage();
  };

  return (
    <GameContext.Provider value={{ handleEndGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
