/**
 * @function generateAnagram
 *
 * @param {string} text Text to anagram
 * @returns {string[]} Array of anagrams
 */
const generateAnagram = (text: string): string[] => {
  const output = [];
  const traverse = (text: string, perm = '') => {
    if (!text) output.push(perm);
    [...Array(text.length)].forEach((_, i: number) => {
      traverse(text.slice(0, i) + text.slice(i + 1), perm + text[i]);
    });
  };
  traverse(text);
  return output;
};

module.exports = { generateAnagram };
