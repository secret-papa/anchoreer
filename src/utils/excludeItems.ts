export const excludeItems = <T>(array: T[], itemsToExclude: T[]) => {
  return array.filter((item: T) => !itemsToExclude.includes(item));
};
