export const flatten = <T>(obj?: { [key: number | string]: any[] }): T[] => {
  if (typeof obj === 'undefined') {
    return [];
  }

  const result: T[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(...obj[key]);
    }
  }

  return result;
};
