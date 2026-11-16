import { getFactorial, getNumOfUniqueAnagrams } from "./math.lib";

/**
 * Swaps two elements in a character array at the specified indices in-place.
 *
 * @param {string[]} chars - The array of characters to modify.
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 */
const swap = (chars: string[], i: number, j: number): void => {
  const tmp = chars[i];
  chars[i] = chars[j];
  chars[j] = tmp;
};

/**
 * Generates a paginated list of anagrams for a given input string.
 *
 * Uses iterative Heap's algorithm to produce permutations of the input string,
 * optionally filtering for uniqueness. Supports pagination via `offset` (page index) and `limit`.
 *
 * @param {string} input - The original string to generate anagrams from.
 * @param {number} offset - The page offset (zero-based page index), used to skip pages.
 * @param {number} limit - The maximum number of anagrams to return per page.
 * @param {boolean} [unique=false] - Whether to return only unique anagrams (no duplicates).
 * @returns {string[]} A list of generated anagrams based on the specified parameters.
 *
 * @example
 * generateAnagram('abc', 0, 3); // ['abc', 'bac', 'cab']
 */
export const generateAnagram = (input: string, offset: number, limit: number, unique: boolean = false): string[] => {
  if (!input || limit <= 0 || offset < 0) {
    return [];
  }

  const numOfAnagrams = unique ? getNumOfUniqueAnagrams(input, input.length) : getFactorial(input.length);
  const startIndex = offset * limit;

  if (startIndex >= numOfAnagrams) {
    return [];
  }

  const counter = new Array<number>(input.length).fill(0);
  const anagrams: string[] = [];
  const seen = unique ? new Set<string>([input]) : null;
  const chars = input.split("");

  let validAnagramsCount = 1;
  if (startIndex === 0) {
    anagrams.push(input);
  }

  let i = 0;

  while (i < input.length && anagrams.length < limit) {
    if (counter[i] < i) {
      swap(chars, i % 2 === 1 ? counter[i] : 0, i);
      counter[i]++;
      i = 0;

      const currentAnagram = chars.join("");

      if (seen) {
        if (seen.has(currentAnagram)) {
          continue;
        }
        seen.add(currentAnagram);
      }

      if (validAnagramsCount >= startIndex) {
        anagrams.push(currentAnagram);
      }

      validAnagramsCount++;
    } else {
      counter[i] = 0;
      i++;
    }
  }

  return anagrams;
};
