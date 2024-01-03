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
export const getAnagrams = async (text: string, offset: number, limit: number, unique: boolean): Promise<AnagramsReturnMessage | null> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/anagram/make?text=${encodeURIComponent(text)}&limit=${limit}&offset=${offset}&unique=${unique}`
    );

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
        return {
          title: 'Content Error',
          detail: 'The response has no content',
        };
      default:
        console.warn(`[AF-MSG] Cannot understand the response asking for anagrams. Status code: ${response.status}`);
        return {
          title: 'Generic Error',
          detail: 'Server response is not supported',
        };
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
 * @param {(text: string) => UnknownAction} setText Set input text
 * @param {string} message Output message
 * @param {(text: string) => void} setMessage Set output message
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

/**
 * @function handleDeleteButtonClick
 *
 * @param {AppDispatch} dispatch Redux dispatcher
 * @param {(text: string) => UnknownAction} setText Set input text
 * @param {(text: string) => void} setMessage Set output message
 * @param {(offset: number) => UnknownAction} setOffset Set offset for paginatio
 * @param {(unique: boolean) => UnknownAction} setUnique Hide/Show duplicate
 * @returns {void}
 */
export const handleDeleteButtonClick = (
  dispatch: AppDispatch,
  setText: (text: string) => UnknownAction,
  setMessage: (message: string) => void,
  setOffset: (offset: number) => UnknownAction,
  setUnique: (unique: boolean) => UnknownAction,
  setAnagrams: (anagrams: AnagramsReturnMessage | []) => UnknownAction
): void => {
  // Reset UI
  setMessage('');
  dispatch(setAnagrams({}));
  dispatch(setOffset(0));
  dispatch(setUnique(false));
  dispatch(setText(''));
};

/**
 * @function handleGoButtonClick
 *
 * @param {AppDispatch} dispatch Redux dispatcher
 * @param {(loading: boolean) => UnknownAction} setLoading Set loading status
 * @param {(anagrams: AnagramsReturnMessage | []) => UnknownAction} setAnagrams Set anagrams results
 * @param {(text: string) => void} setMessage Set output message
 * @param {string} text Input text
 * @param {number} offset Current offset
 * @param {number} limit Current limit
 * @param {boolean} unique No duplicate flag status
 * @param {(offset: number) => UnknownAction} setOffset Set offset for paginatio
 * @param {(unique: boolean) => UnknownAction} setUnique Hide/Show duplicate
 * @returns {void}
 */
export const handleGoButtonClick = async (
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => UnknownAction,
  setAnagrams: (anagrams: AnagramsReturnMessage | []) => UnknownAction,
  setMessage: (message: string) => void,
  setOffset: (offset: number) => UnknownAction,
  setUnique: (unique: boolean) => UnknownAction,
  text: string,
  offset: number,
  limit: number,
  unique: boolean
): Promise<void> => {
  // Loading mode on
  dispatch(setLoading(true));

  // Reset UI
  dispatch(setOffset(0));
  dispatch(setUnique(false));

  // Get anagrams from API
  const anagramsData = await getAnagrams(text, offset, limit, unique);

  // Parsing results
  if (!anagramsData) {
    dispatch(setAnagrams({}));
  } else if (anagramsData.data) {
    dispatch(setAnagrams(anagramsData));
  } else if (anagramsData.title && anagramsData.detail) {
    setMessage(`${anagramsData.title}: ${anagramsData.detail}`);
    dispatch(setAnagrams({}));
  }

  // Loading mode off
  dispatch(setLoading(false));
};
