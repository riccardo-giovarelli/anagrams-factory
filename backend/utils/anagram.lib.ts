import { getFactorial } from './math.lib';

/**
 * @function swap
 *
 * @param {string[]} chars String where swap chars
 * @param {number} i Index of first char
 * @param {number} j Index of second char
 * @returns {string[]} String swapped
 */
const swap = (chars: string[], i: number, j: number): string[] => {
  var tmp = chars[i];
  chars[i] = chars[j];
  chars[j] = tmp;
  return chars;
};

/**
 * @function generateAnagram
 *
 * @param {string} input Text to anagram
 * @param {number} offset Page number in results
 * @param {number} limit Size of page in results
 * @returns {string[]} Array of anagrams
 */
export const generateAnagram = (input: string, offset: number, limit: number): string[] => {
  const numOfAnagrams = getFactorial(input.length);
  const startIndex = offset;
  const endIndex = startIndex + limit > numOfAnagrams - 1 ? numOfAnagrams - 1 : startIndex + limit - 1;
  const counter = new Array(input.length).fill(0);
  const anagrams = [];
  let chars = input.split('');
  let itarations = 0;
  let anagramsCounter = 0;

  // Wrong offset and/or limit
  if (offset * limit > numOfAnagrams) {
    return [];
  }

  // Include the original text
  if (startIndex === 0) {
    anagrams.push(input);
    anagramsCounter++;
  }

  // Generate anagrams
  while (itarations < input.length) {
    if (counter[itarations] < itarations) {
      chars = swap(chars, itarations % 2 === 1 ? counter[itarations] : 0, itarations);
      counter[itarations]++;
      itarations = 0;
      if (anagramsCounter >= startIndex && anagramsCounter <= endIndex) {
        anagrams.push(chars.join(''));
      }
      anagramsCounter++;
    } else {
      counter[itarations] = 0;
      itarations++;
    }
  }

  return anagrams;
};
