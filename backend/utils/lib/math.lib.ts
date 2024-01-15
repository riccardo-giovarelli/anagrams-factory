/**
 * @function getFactorial
 *
 * @param {number} x Source number
 * @returns {number} Factorial of x (!x)
 */
export const getFactorial = (x: number): number => {
  return x > 1 ? x * getFactorial(x - 1) : 1;
};

/**
 * @function getCountOfMultipleOccurrenceInAString
 *
 * @param {string} text Input string to parse
 * @returns {number[]} Count of multiple occurrences for the provided string
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
 * @function getNumOfUniqueAnagrams
 *
 * @param {string} text Input string to process
 * @param {number} textLength Length of the text provided
 *
 * @returns {number} Number of unique anagrams for a provided text
 */
export const getNumOfUniqueAnagrams = (text: string, textLength: number): number =>
  getFactorial(textLength) / getCountOfMultipleOccurrenceInAString(text).reduce((total, num) => total * getFactorial(num), 1);
