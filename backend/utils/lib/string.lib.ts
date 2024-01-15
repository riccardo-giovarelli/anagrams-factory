/**
 * @function simplifyString()
 *
 * @description Simplifies and clean a text
 *
 * @param {string} text Text to simplify
 * @returns {string} Text simplified and cleaned
 */
export const simplifyString = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
