/**
 * @function isJson
 *
 * @param {string} str String to check
 * @returns {boolean} True if the provided string is a json, false otherwise
 */
export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (_) {
    return false;
  }
  return true;
};
