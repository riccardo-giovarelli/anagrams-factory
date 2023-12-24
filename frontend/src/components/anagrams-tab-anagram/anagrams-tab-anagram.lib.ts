/**
 * @function getAnagrams
 *
 * @param {string} text Text to anagram
 * @param {number} offset Query offset
 * @param {limit} limit Query limit
 * @returns {array} Anagrams for text provided
 */
export const getAnagrams = async (text: string, offset: number, limit: number): Promise<string[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/anagram/make?text=${text}&limit=${limit}&offset=${offset}`);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const results = await response.json();
      if (results.data && Array.isArray(results.data)) {
        return results.data;
      } else {
        return [];
      }
    }
  } catch (e) {
    console.warn('[AF-MSG] Error getting anagrams.', e);
    return [];
  }
  return [];
};
