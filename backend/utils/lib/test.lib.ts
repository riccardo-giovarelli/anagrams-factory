/**
 * Determines whether a given string is valid JSON.
 *
 * Attempts to parse the input string using `JSON.parse`. If parsing succeeds,
 * the string is considered valid JSON and the function returns `true`.
 * If an error is thrown during parsing, it returns `false`.
 *
 * @param {string | undefined} str - The string to validate as JSON.
 * @returns {boolean} `true` if the string is valid JSON, otherwise `false`.
 *
 * @example
 * isJson('{"name":"Alice"}'); // true
 * isJson('{name:Alice}');     // false
 */
export const isJson = (str: string | undefined): boolean => {
  if (!str) {
    return false;
  }

  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};
