import "dotenv/config";

// Sample input text (valid)
export const inputText: string = "Rick";

// Sample input text (valid) with repeated characters
export const inputTextWithRepeatedCharacters: string = "natan";

// Sample input text (invalid characters)
export const inputInvalidText: string = "12_34!56";

// Sample input text (too long)
export const getTooLongText = (): string => {
  const maxLength = Number(process.env.ANAGRAM_INPUT_TEXT_MAX_LENGTH) || 10;
  return Array.from({ length: maxLength + 1 }, () => "a").join("");
};
