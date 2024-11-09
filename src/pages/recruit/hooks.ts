import { useEffect } from 'react';

import { useDutyStore, useRecruitStore } from './stores';
import { useListDutyQuery, useListRecruitQuery } from './queries';
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

export const useDuty = () => {
  const { data: listDuty } = useListDutyQuery();

  const normalizedDuty = useDutyStore((store) => store.normalizedDuty);
  const setDuties = useDutyStore((store) => store.setDuties);
  const normalizeDuty = useDutyStore((store) => store.normalize);

  useEffect(() => {
    if (!isDefined(listDuty)) {
      return;
    }
    setDuties(listDuty);
    normalizeDuty();
  }, [listDuty]);

  return {
    duties: normalizedDuty,
  };
};
