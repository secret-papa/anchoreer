import { useEffect, useState } from 'react';

import { groupByDate, isDefined, mergeGroupedData, normalize } from '../../utils';
import type { ArrayElement } from '../../utils';
import type { ListDutyResponse, ListRecruitResponse } from '../../apis';
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

type Go = Record<
  number,
  {
    id: number;
    name: string;
    parent_id: number | null;
    children?: number[];
  }
>;

export const useDuty = (listDuty?: ListDutyResponse) => {
  // TODO:: define type
  const [duties, setDuties] = useState<Go>();

  const getDuty = (dutyId: number) => {
    return duties?.[dutyId];
  };

  useEffect(() => {
    if (!isDefined(listDuty)) {
      return;
    }

    setDuties(gogo(listDuty));
  }, [listDuty]);

  return {
    duties,
    getDuty,
  };
};

// TODO:: refactoring
const gogo = (listDuty: ListDutyResponse) => {
  return listDuty.reduce((acc, duty) => {
    const key = duty.id;

    if (!acc[key]) {
      acc[key] = {
        ...duty,
      };
    }

    if (duty.parent_id !== null) {
      let parentDuty = acc[duty.parent_id];

      if (!parentDuty) {
        // TODO:: define type
        parentDuty = {} as any;
      }

      if (!parentDuty.children) {
        parentDuty.children = [];
      }

      parentDuty.children.push(duty.id);
    }

    return acc;
  }, {} as Go);
};
