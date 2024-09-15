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
