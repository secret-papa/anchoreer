export const isEmptyObject = (obj: Record<string | number, unknown>) => {
  return Object.keys(obj).length === 0;
};
