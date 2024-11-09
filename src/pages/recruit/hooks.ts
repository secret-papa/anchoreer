import { useEffect } from 'react';

import { useDutyStore, useRecruitStore } from './stores';
import { useListDutyQuery, useListRecruitQuery } from './queries';
import { flatten, isDefined, removeDuplicates } from '../../utils';
import type { RecruitFilter } from './types';

export const useRecruit = (filter: RecruitFilter = { date: new Date(), ids: [] }) => {
  const { data: listRecruit } = useListRecruitQuery();

  const getRecruitsGroupedByDate = useRecruitStore((state) => state.getRecruitsGroupedByDate);
  const getRecruitById = useRecruitStore((state) => state.getById);
  const setRecruits = useRecruitStore((state) => state.setRecruits);
  const normalizeRecruit = useRecruitStore((state) => state.normalize);
  const groupRecruitsByDate = useRecruitStore((state) => state.groupByDate);

  const recruitsGroupedByDate = getRecruitsGroupedByDate(
    filter.date.getFullYear(),
    filter.date.getMonth() + 1
  );

  const recruits = removeDuplicates(flatten<number>(recruitsGroupedByDate))
    .map(getRecruitById)
    .filter(isDefined);

  const filteredRecruits =
    filter.ids.length === 0
      ? recruits
      : recruits.filter((recruit) => filter.ids.some((id) => recruit.duty_ids.includes(id)));

  useEffect(() => {
    if (!isDefined(listRecruit)) {
      return;
    }

    setRecruits(listRecruit);
    normalizeRecruit();
    groupRecruitsByDate();
  }, [listRecruit]);

  return {
    recruits: filteredRecruits,
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
