import { create } from 'zustand';

import { groupByDate, mergeGroupedData, normalize } from '../../utils';
import type { RecruitStore } from './types';

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
