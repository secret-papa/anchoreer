import type { ListRecruitResponse } from '../../apis';
import type { DateGroupedData } from '../../types';
import type { ArrayElement } from '../../utils';

type RecruitStoreState = {
  recruits: ListRecruitResponse;
  normalizedRecruit: Record<number, ArrayElement<ListRecruitResponse>>;
  recruitsGroupedByDate: DateGroupedData;
};

type RecruitStoreAction = {
  setRecruits: (recruits: ListRecruitResponse) => void;
  normalize: () => void;
  groupByDate: () => void;
  getById: (id: number) => ArrayElement<ListRecruitResponse>;
  getRecruitsGroupedByDate: (
    year: number,
    month: number
  ) => { [date: number]: number[] } | undefined;
};

export type RecruitStore = RecruitStoreState & RecruitStoreAction;
