import { useEffect, useState } from 'react';

import { useRecruitStore } from './stores';
import { useListRecruitQuery } from './queries';
import { ListDutyResponse } from '../../apis';
import { flatten, isDefined, removeDuplicates } from '../../utils';

export const useRecruit = (currentDate: Date, filterIds: number[]) => {
  const { data: listRecruit } = useListRecruitQuery();

  const getRecruitsGroupedByDate = useRecruitStore((state) => state.getRecruitsGroupedByDate);
  const getRecruitById = useRecruitStore((state) => state.getById);
  const setRecruits = useRecruitStore((state) => state.setRecruits);
  const normalizeRecruit = useRecruitStore((state) => state.normalize);
  const groupRecruitsByDate = useRecruitStore((state) => state.groupByDate);

  const recruitsGroupedByDate = getRecruitsGroupedByDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const recruits = removeDuplicates(flatten<number>(recruitsGroupedByDate))
    .map(getRecruitById)
    .filter((recruit) => {
      if (!isDefined(recruit)) {
        return false;
      }

      if (filterIds.length === 0) {
        return true;
      }

      return filterIds.some((filterId) => recruit.duty_ids.includes(filterId));
    })
    // TODO:: 제거 필요?
    .filter(isDefined);

  useEffect(() => {
    if (!listRecruit) {
      return;
    }

    // TODO:: refactoring
    setRecruits(listRecruit);
    normalizeRecruit();
    groupRecruitsByDate();
  }, [listRecruit]);

  return {
    recruits,
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
