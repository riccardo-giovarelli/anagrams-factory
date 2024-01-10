/**
 * @function simplifyString()
 *
 * @param text
 * @returns
 */
export const simplifyString = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
