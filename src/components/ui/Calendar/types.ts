import type { ReactNode } from 'react';

import type { DateString } from '../../../types';

export type CalendarEvent<T = unknown> = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  meta?: T;
};

export type EventProps<T = unknown> = {
  date: Date;
  event: CalendarEvent<T>;
};

export type CalendarProps<T = unknown> = {
  currentDate: Date;
  events?: Record<DateString, CalendarEvent<T>[]>;
  renderEvent: (props: EventProps<T>) => ReactNode;
  onCurrentDateChange: (currentDate: Date) => void;
};
