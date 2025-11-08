import { getFactorial, getNumOfUniqueAnagrams } from './math.lib';

/**
 * Swaps two elements in a character array at the specified indices.
 *
 * Modifies the original array by exchanging the elements at positions `i` and `j`,
 * and returns the updated array.
 *
 * @param {string[]} chars - The array of characters to modify.
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 * @returns {string[]} The modified array with the two elements swapped.
 */
const swap = (chars: string[], i: number, j: number): string[] => {
  const tmp = chars[i];
  chars[i] = chars[j];
  chars[j] = tmp;
  return chars;
};

/**
 * Generates a paginated list of anagrams for a given input string.
 *
 * Uses Heap's algorithm to produce permutations of the input string,
 * optionally filtering for uniqueness. Supports pagination via `offset` and `limit`,
 * returning only the requested slice of anagrams.
 *
 * @param {string} input - The original string to generate anagrams from.
 * @param {number} offset - The page offset (zero-based), used to skip anagrams.
 * @param {number} limit - The maximum number of anagrams to return.
 * @param {boolean} [unique=false] - Whether to return only unique anagrams (no duplicates).
 * @returns {string[]} A list of generated anagrams based on the specified parameters.
 *
 * @example
 * generateAnagram('abc', 0, 3); // ['abc', 'bac', 'cab']
 */
export const generateAnagram = (input: string, offset: number, limit: number, unique: boolean = false): string[] => {
  const numOfAnagrams = unique ? getNumOfUniqueAnagrams(input, input.length) : getFactorial(input.length);
  const startIndex = offset * limit;
  const counter = new Array(input.length).fill(0);
  const anagrams = [];
  let chars = input.split('');
  let iterations = 0;
  let anagramsCounter = 0;

  // Wrong offset
  if (startIndex > numOfAnagrams - 1) {
    return [];
  }

  // Include the original text
  if (startIndex === 0) {
    anagrams.push(input);
    anagramsCounter++;
  }

  // Generate anagrams
  while (iterations < input.length) {
    if (counter[iterations] < iterations) {
      chars = swap(chars, iterations % 2 === 1 ? counter[iterations] : 0, iterations);
      counter[iterations]++;
      iterations = 0;
      const currentAnagram = chars.join('');
      if (!unique && anagramsCounter >= startIndex && anagrams.length < limit) {
        anagrams.push(currentAnagram);
        anagramsCounter++;
      } else if (
        unique &&
        anagramsCounter >= startIndex &&
        !anagrams.includes(currentAnagram) &&
        anagrams.length < limit
      ) {
        anagrams.push(currentAnagram);
        anagramsCounter++;
      } else if (anagramsCounter < startIndex) {
        anagramsCounter++;
      } else if (anagrams.length - 1 === limit) {
        break;
      }
    } else {
      counter[iterations] = 0;
      iterations++;
    }
  }

  return anagrams;
};
