/**
 * @function getFactorial
 *
 * @param {number} x Source number
 * @returns {number} Factorial of x (!x)
 */
export const getFactorial = (x: number): number => {
  return x > 1 ? x * getFactorial(x - 1) : 1;
};
