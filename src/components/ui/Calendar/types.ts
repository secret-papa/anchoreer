import type { ReactNode } from 'react';

type Year = string;
type Month = string;
type Day = string;
export type DateString = `${Year}-${Month}-${Day}`;

export type CalendarEvent<T = unknown> = {
  title: string;
  startDate: Date;
  endDate: Date;
  meta?: T;
};

export type EventProps = {
  date: Date;
  event: CalendarEvent;
};

export type CalendarProps<T = unknown> = {
  currentDate: Date;
  events?: Record<DateString, CalendarEvent<T>[]>;
  renderEvent: (props: EventProps) => ReactNode;
  onCurrentDateChange: (currentDate: Date) => void;
};
