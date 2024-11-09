import { CalendarEvent } from '../../../components/ui';
import type { Recruit } from '../types';

export type RecruitEvent = CalendarEvent<{
  recruit: Recruit;
  nextEvent?: string;
  prevEvent?: string;
}>;
