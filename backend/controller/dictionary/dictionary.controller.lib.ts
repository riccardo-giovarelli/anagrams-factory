import 'dotenv/config';

/**
 * @function isValidLanguage
 *
 * @param {string} lang
 * @returns {boolean} true if lang is a valid language, false otherwise
 */
export const isValidLanguage = (lang: string): boolean => {
  const availableLanguages = process.env.DICTIONARY_AVAILABLE_LANGUAGES.split('|');
  return availableLanguages.includes(lang);
};
