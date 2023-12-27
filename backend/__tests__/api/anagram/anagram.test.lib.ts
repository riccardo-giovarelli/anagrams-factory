import 'dotenv/config';

// Sample input text (valid)
export const inputText = 'rick';

// Sample input text (invalid characters)
export const inputInvalidText = '12_34!56';

// Sample input text (too long)
export const getTooLongText = () => [...Array(Number(process.env.INPUT_TEXT_MAX_LENGTH) + 1)].map((_, i) => 'a').join('');
