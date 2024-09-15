import { Card } from "types/cards";

// Function to calculate factorial with memoization
export const factorial = (() => {
  const cache: { [key: number]: number } = {}; // Cache to store computed factorials
  return (n: number): number => {
    if (n === 0) return 1;
    if (cache[n]) return cache[n];
    cache[n] = n * factorial(n - 1);
    return cache[n];
  };
})();

// Function to calculate combinatorial nCr (n choose r)
export const combinatorial = (n: number, r: number): number => {
  if (r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

// Function to generate all combinations of a specific length from an array
export const generateCombinations = <T>(array: T[], length: number): T[][] => {
  const result: T[][] = [];
  const combine = (start: number, prefix: T[]): void => {
    if (prefix.length === length) {
      result.push(prefix);
      return;
    }
    for (let i = start; i < array.length; i++) {
      combine(i + 1, prefix.concat(array[i]));
    }
  };
  combine(0, []);
  return result;
};

// Function to work out if elements are next to each other (assuming the array contains numbers)
export const isSequential = (array: number[]): boolean => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1] + 1) {
      return false;
    }
  }
  return true;
};

// Function to count occurrences of card ranks
export const countRanks = (cards: Card[]): { [key: string]: number } => {
  const valueCount: { [key: string]: number } = {};
  cards.forEach((card) => {
    valueCount[card.rank] = (valueCount[card.rank] || 0) + 1;
  });
  return valueCount;
};

// Function to sort cards by rank
export const sortCardsByRank = (cards: Card[]): Card[] => {
  return cards.sort((a, b) => parseInt(b.rank) - parseInt(a.rank));
};

// Function to find n of a kind cards
export const findNOfAKind = (cards: Card[], n: number): Card[] | null => {
  const valueCount = countRanks(cards);
  const matchValue = Object.keys(valueCount).find(
    (value) => valueCount[value] === n
  );

  if (matchValue) {
    return cards.filter((card) => card.rank === matchValue);
  }

  return null;
};
