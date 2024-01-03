import { getFactorial, getNumOfUniqueAnagrams } from './math.lib';

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
 * @param {boolean} unique Return only unique values
 * @returns {string[]} Array of anagrams
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
      } else if (unique && anagramsCounter >= startIndex && !anagrams.includes(currentAnagram) && anagrams.length < limit) {
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
