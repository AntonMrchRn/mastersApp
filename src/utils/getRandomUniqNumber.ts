export const getRandomUniqNumber = (ids: number[]): number => {
  const val = Math.round(Math.random() * 1000000);
  if (ids.includes(val)) {
    return getRandomUniqNumber(ids);
  }
  return val;
};
