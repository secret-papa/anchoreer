export const countMatches = <T>(source: T[], target: T[]) => {
  return target.filter((item) => source.includes(item)).length;
};
