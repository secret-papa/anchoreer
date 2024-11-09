import type { Duty } from '../../types';

export type RecruitFilterProps = {
  duties: Record<number, Duty>;
  filteredIds: number[];
  onFilter: (filteredIds: number[]) => void;
};
