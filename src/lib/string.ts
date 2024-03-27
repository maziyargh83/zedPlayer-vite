export const shortString = (str: string, length = 10) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
