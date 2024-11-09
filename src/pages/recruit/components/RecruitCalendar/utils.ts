import { v4 as uuidv4 } from 'uuid';

import { isDefined } from '../../../../utils';
import type { RecruitEvent } from '../types';
import type { Recruit } from '../../types';
import type { DateString } from '../../../../types';

export const makeEvents = (recruits: Recruit[]) => {
  const events = groupByDate(recruits);
  sortEventsByStartDate(events);

  return linkItems(events);
};

const groupByDate = (recruits: Recruit[]) => {
  return recruits.reduce<Record<DateString, RecruitEvent[]>>((acc, recruit) => {
    const addEvent = (dateKey: DateString) => {
      if (!isDefined(acc[dateKey])) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        id: uuidv4(),
        title: recruit.company_name,
        startDate: new Date(recruit.start_time),
        endDate: new Date(recruit.end_time),
        meta: { recruit },
      });
    };

    addEvent(recruit.start_time.split(' ')[0] as DateString);
    addEvent(recruit.end_time.split(' ')[0] as DateString);

    return acc;
  }, {});
};

const sortEventsByStartDate = (eventsByDate: Record<DateString, RecruitEvent[]>) => {
  for (const key in eventsByDate) {
    const dateKey = key as DateString;
    eventsByDate[dateKey].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  return eventsByDate;
};

const linkItems = (
  events: Record<DateString, RecruitEvent[]>
): Record<DateString, RecruitEvent[]> => {
  const sortedKeys = Object.keys(events).sort() as DateString[];

  let previousId: string | undefined;

  sortedKeys.forEach((dateKey, index) => {
    const items = events[dateKey];

    items.forEach((item, itemIndex) => {
      if (!item.meta) {
        return;
      }

      item.meta.prevEvent = previousId;

      let nextItem: RecruitEvent | undefined;
      if (itemIndex < items.length - 1) {
        nextItem = items[itemIndex + 1];
      } else if (index < sortedKeys.length - 1) {
        const nextDateKey = sortedKeys[index + 1];
        nextItem = events[nextDateKey][0];
      }

      item.meta.nextEvent = nextItem?.id;

      previousId = item.id;
    });
  });

  return events;
};
