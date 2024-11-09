export const isSubsetArray = <T>(subset: T[], superset: T[]) => {
  return subset.every((item) => superset.includes(item));
};
