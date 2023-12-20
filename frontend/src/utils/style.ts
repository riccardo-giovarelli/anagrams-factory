/**
 * @function getClassNames
 *
 * @param {string[]} classes Classes array
 * @returns {string} ClassName string
 */
export const getClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
