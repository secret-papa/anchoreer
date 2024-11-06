export const normalize = <T extends Record<K, any>, K extends keyof T>(
  array: T[],
  key: K
): Record<T[K], T> => {
  return array.reduce(
    (acc, item) => {
      acc[item[key]] = item;
      return acc;
    },
    {} as Record<T[K], T>
  );
};
