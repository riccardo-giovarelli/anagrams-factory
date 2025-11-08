/**
 * Normalizes and simplifies a string by removing diacritics, converting to lowercase, and trimming whitespace.
 *
 * Uses Unicode normalization (NFD) to separate base characters from diacritical marks,
 * then strips those marks using a regular expression. The result is a lowercase, trimmed string
 * suitable for consistent comparison or indexing.
 *
 * @param {string} text - The input string to simplify.
 * @returns {string} The simplified version of the input string.
 *
 * @example
 * simplifyString('Café ') // returns 'cafe'
 */
export const simplifyString = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
