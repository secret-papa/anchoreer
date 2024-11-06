import type { DateGroupedData } from '../types';

export const mergeGroupedData = (
  groupedByDate1: DateGroupedData,
  groupedByDate2: DateGroupedData
): DateGroupedData => {
  const mergedGroupedData: DateGroupedData = {};

  for (const year in groupedByDate1) {
    if (!mergedGroupedData[year]) mergedGroupedData[year] = {};

    for (const month in groupedByDate1[year]) {
      if (!mergedGroupedData[year][month]) mergedGroupedData[year][month] = {};

      for (const day in groupedByDate1[year][month]) {
        if (!mergedGroupedData[year][month][day]) mergedGroupedData[year][month][day] = [];

        mergedGroupedData[year][month][day].push(...groupedByDate1[year][month][day]);
      }
    }
  }

  for (const year in groupedByDate2) {
    if (!mergedGroupedData[year]) mergedGroupedData[year] = {};

    for (const month in groupedByDate2[year]) {
      if (!mergedGroupedData[year][month]) mergedGroupedData[year][month] = {};

      for (const day in groupedByDate2[year][month]) {
        if (!mergedGroupedData[year][month][day]) mergedGroupedData[year][month][day] = [];

        mergedGroupedData[year][month][day].push(...groupedByDate2[year][month][day]);
      }
    }
  }

  return mergedGroupedData;
};
