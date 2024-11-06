import { isDefined } from '../../../../utils';
import type { Recruit } from './types';
import type { CalendarEvent, DateString } from '../../../../components/ui';

export const makeEvents = (recruits?: Recruit[]) => {
  if (!isDefined(recruits)) {
    return;
  }

  const events = groupByDate(recruits);
  sortEventsByStartDate(events);

  return events;
};

const groupByDate = (recruits: Recruit[]) => {
  return recruits.reduce<Record<DateString, CalendarEvent[]>>((acc, recruit) => {
    const addEvent = (dateKey: DateString) => {
      if (!isDefined(acc[dateKey])) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        title: recruit.company_name,
        startDate: new Date(recruit.start_time),
        endDate: new Date(recruit.end_time),
        meta: { recruitId: recruit.id },
      });
    };

    addEvent(recruit.start_time.split(' ')[0] as DateString);
    addEvent(recruit.end_time.split(' ')[0] as DateString);

    return acc;
  }, {});
};

const sortEventsByStartDate = (eventsByDate: Record<DateString, CalendarEvent[]>) => {
  for (const key in eventsByDate) {
    const dateKey = key as DateString;
    eventsByDate[dateKey].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  return eventsByDate;
};
