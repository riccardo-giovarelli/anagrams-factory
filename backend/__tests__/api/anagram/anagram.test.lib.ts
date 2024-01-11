import 'dotenv/config';

// Sample input text (valid)
export const inputText = 'Rick';

// Sample imput text (valid) with repeated characters
export const inputTextWithRepeatedCharacters = 'natan';

// Sample input text (invalid characters)
export const inputInvalidText = '12_34!56';

// Sample input text (too long)
export const getTooLongText = () => [...Array(Number(process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH) + 1)].map((_, i) => 'a').join('');
