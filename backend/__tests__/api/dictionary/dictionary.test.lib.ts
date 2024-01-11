import 'dotenv/config';

// Sample input word (valid)
export const inputWord = 'Rick';

// Sample input word to test non in dictionary response
export const inputWordEmptyResponse = 'Morty';

// Sample language code (valid)
export const inputLanguageCode = 'it';

// Sample invalid language code (valid)
export const invalidLanguageCode = 'sXffR2';

// Sample input text (too long)
export const getTooLongText = () => [...Array(Number(process.env.DICTIONARY_INPUT_WORD_MAX_LENGTH) + 1)].map((_, i) => 'a').join('');
