type Year = string;
type Month = string;
type Day = string;
export type DateString = `${Year}-${Month}-${Day}`;

type CalendarEvent<T = unknown> = {
  title: string;
  startDate: Date;
  endDate: Date;
  meta?: T;
};

export type CalendarProps<T = unknown> = {
  events: Record<DateString, CalendarEvent<T>[]>;
};
