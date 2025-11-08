/**
 * Recursively computes the factorial of a non-negative integer.
 *
 * The factorial of a number `x` is the product of all positive integers less than or equal to `x`.
 * For example, `getFactorial(5)` returns `120` because 5 × 4 × 3 × 2 × 1 = 120.
 * Returns 1 for values less than or equal to 1.
 *
 * @param {number} x - A non-negative integer whose factorial is to be calculated.
 * @returns {number} The factorial of the input number.
 */
export const getFactorial = (x: number): number => {
  return x > 1 ? x * getFactorial(x - 1) : 1;
};

/**
 * Counts how many times each character appears more than once in a string.
 *
 * Iterates through the input string and builds a frequency map of characters.
 * Returns an array of counts for characters that occur more than once.
 * Characters that appear only once are excluded from the result.
 *
 * @param {string} text - The input string to analyze.
 * @returns {number[]} An array of occurrence counts for characters that appear multiple times.
 *
 * @example
 * getCountOfMultipleOccurrenceInAString('aabbc') // [2, 2]
 */
const getCountOfMultipleOccurrenceInAString = (text: string): number[] => {
  const count = {};
  text.split('').forEach((char: string) => {
    count[char] = !count[char] ? 1 : count[char] + 1;
  });
  return Object.keys(count)
    .map((char: string) => (count[char] > 1 ? count[char] : null))
    .filter((item: number | null) => item !== null);
};

/**
 * Calculates the number of unique anagrams that can be formed from a given string.
 *
 * Uses the formula: factorial of the string length divided by the product of factorials
 * of counts of characters that occur more than once. This accounts for repeated characters
 * that reduce the total number of distinct permutations.
 *
 * @param {string} text - The input string to analyze.
 * @param {number} textLength - The length of the input string.
 * @returns {number} The total number of unique anagrams that can be generated.
 *
 * @example
 * getNumOfUniqueAnagrams('aabb', 4); // returns 6
 */

export const getNumOfUniqueAnagrams = (text: string, textLength: number): number =>
  getFactorial(textLength) /
  getCountOfMultipleOccurrenceInAString(text).reduce((total, num) => total * getFactorial(num), 1);
