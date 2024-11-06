import type { DateGroupedData } from '../types';

export const groupByDate = <T>(
  array: T[],
  dateExtractor: (item: T) => Date,
  valueExtractor: (item: T) => any
): DateGroupedData => {
  return array.reduce<DateGroupedData>((acc, item) => {
    const date = dateExtractor(item);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = {};
    }

    if (!acc[year][month][day]) {
      acc[year][month][day] = [];
    }

    acc[year][month][day].push(valueExtractor(item));

    return acc;
  }, {});
};
