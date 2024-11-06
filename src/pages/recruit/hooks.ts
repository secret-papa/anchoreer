import { useEffect, useState } from 'react';

import { groupByDate, isDefined, mergeGroupedData, normalize } from '../../utils';
import type { ArrayElement } from '../../utils';
import type { ListRecruitResponse } from '../../apis';
import type { DateGroupedData } from '../../types';

export const useRecruit = (listRecruit?: ListRecruitResponse) => {
  const [normalizedRecruit, setNormalizedRecruit] =
    useState<Record<number, ArrayElement<ListRecruitResponse>>>();
  const [recruitsGroupedByDate, setRecruitsGroupedByDate] = useState<DateGroupedData>();

  const getRecruitById = (recruitId: number) => {
    return normalizedRecruit?.[recruitId];
  };

  const getRecruitsGroupedByDate = (year: number, month: number) => {
    return recruitsGroupedByDate?.[year]?.[month];
  };

  useEffect(() => {
    if (!isDefined(listRecruit)) {
      return;
    }

    setNormalizedRecruit(normalize(listRecruit, 'id'));
    setRecruitsGroupedByDate(
      mergeGroupedData(
        groupByDate<ArrayElement<ListRecruitResponse>>(
          listRecruit,
          (recruit) => new Date(recruit.start_time),
          (recruit) => recruit.id
        ),
        groupByDate<ArrayElement<ListRecruitResponse>>(
          listRecruit,
          (recruit) => new Date(recruit.end_time),
          (recruit) => recruit.id
        )
      )
    );
  }, [listRecruit]);

  return {
    getRecruitById,
    getRecruitsGroupedByDate,
  };
};
