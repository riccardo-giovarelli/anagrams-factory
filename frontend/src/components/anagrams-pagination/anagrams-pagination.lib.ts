/**
 * Handles the "previous" button click in a pagination or navigation context.
 *
 * Decreases the current offset by one if the result remains non-negative,
 * and updates the offset using the provided setter function.
 *
 * @param {number} offset - The current offset value representing the current position.
 * @param {(offset: number) => void} setOffset - Callback function to update the offset.
 * @returns void
 */
export const handlePreviousClick = (offset: number, setOffset: (offset: number) => void): void => {
  if (offset - 1 >= 0) {
    setOffset(offset - 1);
  }
};

/**
 * Handles the "next" button click in a pagination or navigation context.
 *
 * Increments the current offset by one if the resulting range does not exceed the total number of items.
 * Uses the provided setter function to update the offset.
 *
 * @param {number} limit - The number of items displayed per page.
 * @param {number} offset - The current page offset.
 * @param {number} total - The total number of items available.
 * @param {(offset: number) => void} setOffset - Callback function to update the offset.
 * @returns void
 */
export const handleNextClick = (
  limit: number,
  offset: number,
  total: number,
  setOffset: (offset: number) => void
): void => {
  if (limit * (offset + 1) <= total) {
    setOffset(offset + 1);
  }
};
