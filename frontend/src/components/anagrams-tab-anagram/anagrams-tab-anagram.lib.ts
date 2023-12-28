import { UnknownAction } from '@reduxjs/toolkit';

import { AppDispatch } from '../../redux/store';
import { AnagramsReturnMessage } from './anagrams-tab-anagram.type';


/**
 * @function getAnagrams
 *
 * @param {string} text Text to anagram
 * @param {number} offset Query offset
 * @param {limit} limit Query limit
 * @returns {array} Anagrams for text provided
 */
export const getAnagrams = async (text: string, offset: number, limit: number): Promise<AnagramsReturnMessage | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/anagram/make?text=${encodeURIComponent(text)}&limit=${limit}&offset=${offset}`);

    if (!response?.status) {
      console.warn('[AF-MSG] No response asking for anagrams');
      return null;
    }

    switch (response.status) {
      // OK
      case 200:
        const dataContentType = response.headers.get('content-type');
        if (dataContentType && dataContentType.indexOf('application/json') !== -1) {
          const results = await response.json();
          if (results.data && Array.isArray(results.data)) {
            return results;
          }
        }
        return null;
      // Unprocessable Entity
      case 422:
        const unprocessableEntityContentType = response.headers.get('content-type');
        if (unprocessableEntityContentType && unprocessableEntityContentType.indexOf('application/json') !== -1) {
          const results = await response.json();
          if (results.title && results.detail) {
            return {
              title: results.title,
              detail: results.detail,
            };
          }
        }
        return null;
      // No Content
      case 204:
        return null;
      default:
        console.warn(`[AF-MSG] Cannot understand the response asking for anagrams. Status code: ${response.status}`);
        return null;
    }
  } catch (e) {
    console.warn('[AF-MSG] Error getting anagrams.', e);
    return null;
  }
};

/**
 * @function handleInputChange
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event Change event
 * @param {AppDispatch} dispatch Redux dispatcher
 * @param {(text: string) => UnknownAction} setText
 * @param {string} message Output message
 * @param {(text: string) => void} setText Set output message
 * @returns {void}
 */
export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatch,
  setText: (text: string) => UnknownAction,
  message: string,
  setMessage: (message: string) => void
): void => {
  if (message) {
    setMessage('');
  }
  dispatch(setText(event.target.value));
};
