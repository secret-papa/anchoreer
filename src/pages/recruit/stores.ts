import { create } from 'zustand';

import { groupByDate, mergeGroupedData, normalize } from '../../utils';
import type { Duty, DutyStore, RecruitStore } from './types';
import type { ListDutyResponse } from '../../apis';

export const useRecruitStore = create<RecruitStore>((set, get) => ({
  recruits: [],
  normalizedRecruit: {},
  recruitsGroupedByDate: {},
  setRecruits: (recruits) => set(() => ({ recruits })),
  normalize: () => set((state) => ({ normalizedRecruit: normalize(state.recruits, 'id') })),
  groupByDate: () =>
    set((state) => ({
      recruitsGroupedByDate: mergeGroupedData(
        groupByDate(
          state.recruits,
          (recruit) => new Date(recruit.start_time),
          (recruit) => recruit.id
        ),
        groupByDate(
          state.recruits,
          (recruit) => new Date(recruit.end_time),
          (recruit) => recruit.id
        )
      ),
    })),
  getById: (id: number) => get().normalizedRecruit[id],
  getRecruitsGroupedByDate: (year: number, month: number) =>
    get().recruitsGroupedByDate?.[year]?.[month],
}));

export const useDutyStore = create<DutyStore>((set, get) => ({
  duties: [],
  normalizedDuty: {},
  setDuties: (duties) => set(() => ({ duties })),
  normalize: () => set((state) => ({ normalizedDuty: normalizeDuty(state.duties) })),
  getById: (id: number) => get().normalizedDuty[id],
}));

// TODO:: refactoring
const normalizeDuty = (listDuty: ListDutyResponse) => {
  return listDuty.reduce(
    (acc, duty) => {
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
    },
    {} as Record<number, Duty>
  );
};
