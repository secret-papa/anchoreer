import { useEffect, useState } from 'react';

import { makeEvents } from './utils';
import { flatten, normalize } from '../../../../utils';
import { useLocalStorage } from '../../../../hooks';
import type { RecruitEvent } from '../types';
import type { Recruit } from '../../types';
import type { DateString } from '../../../../types';

export const useRecruitEvents = (recruits?: Recruit[]) => {
  const [events, setEvents] = useState<Record<DateString, RecruitEvent[]>>();
  const [selectedEvent, setSelectedEvent] = useState<RecruitEvent>();
  const [readEvents, setReadEvents] = useLocalStorage<Record<string, boolean>>(
    'READ_RECRUIT_EVENTS',
    {}
  );
  const [normalizedEvents, setNormalizedEvents] = useState<Record<string, RecruitEvent>>();

  const getEvent = (eventId: string) => {
    return normalizedEvents?.[eventId];
  };

  const selectEvent = (event: RecruitEvent) => {
    setSelectedEvent(event);
    setReadEvents((prev) => {
      if (!event.meta) {
        return prev;
      }

      return {
        ...prev,
        [event.meta.recruit.id]: true,
      };
    });
  };

  useEffect(() => {
    if (!recruits) {
      return;
    }

    const events = makeEvents(recruits);
    setEvents(events);
    setNormalizedEvents(normalize(flatten(events), 'id'));
  }, [recruits]);

  return {
    events,
    selectedEvent,
    readEvents,
    getEvent,
    selectEvent,
  };
};
