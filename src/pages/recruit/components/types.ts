import { CalendarEvent } from '../../../components/ui';

export type Recruit = {
  id: number;
  company_name: string;
  title: string;
  start_time: string;
  end_time: string;
  image_url: string;
  duty_ids: number[];
};

export type RecruitEvent = CalendarEvent<{
  recruit: Recruit;
  nextEvent?: string;
  prevEvent?: string;
}>;
