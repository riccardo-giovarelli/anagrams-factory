/**
 * @function mergeClassNames
 *
 * @param {string[]} classes Classes array
 * @returns {string} ClassName string
 */
export const mergeClassNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};
