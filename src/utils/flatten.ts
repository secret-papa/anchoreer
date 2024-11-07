export const flatten = <T>(obj?: { [key: number | string]: T[] }): T[] => {
  return obj ? Object.values(obj).flatMap((arr) => arr) : [];
};
