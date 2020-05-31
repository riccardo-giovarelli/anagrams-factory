
// Return array with unique value
export const getUniqueValue = (data: Array<any>) =>
  data.filter((value: any, index: number) => data.indexOf(value) === index);

