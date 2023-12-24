export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (_) {
    return false;
  }
  return true;
};
