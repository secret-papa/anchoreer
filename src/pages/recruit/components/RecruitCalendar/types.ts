import type { Recruit } from '../../types';

export type RecruitCalendarProps = {
  currentDate: Date;
  recruits?: Recruit[];
  onCurrentDateChange: (currentDate: Date) => void;
};
