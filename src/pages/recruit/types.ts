import type { ListDutyResponse, ListRecruitResponse } from '../../apis';
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
  getById: (id: number) => ArrayElement<ListRecruitResponse> | undefined;
  getRecruitsGroupedByDate: (
    year: number,
    month: number
  ) => { [date: number]: number[] } | undefined;
};

export type RecruitStore = RecruitStoreState & RecruitStoreAction;

// TODO:: refine type
export type Duty = {
  id: number;
  name: string;
  parent_id: number | null;
  children?: number[];
};

type DutyStoreState = {
  duties: ListDutyResponse;
  normalizedDuty: Record<number, Duty>;
};

type DutyStoreAction = {
  setDuties: (duties: ListDutyResponse) => void;
  normalize: () => void;
  getById: (id: number) => Duty | undefined;
};

export type DutyStore = DutyStoreState & DutyStoreAction;
