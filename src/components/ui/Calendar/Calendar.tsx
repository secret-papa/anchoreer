import { useState } from 'react';

import styles from './styles.module.scss';
import { getCalendarRange } from './utils';
import { Days } from './Days';
import { Cell } from './Cell';
import { Navigator } from './Navigator';
import type { CalendarProps, DateString } from './types';

export const Calendar = <T,>({ events }: CalendarProps<T>) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const calendarRange = getCalendarRange(currentDate);

  const handlePrevMonth = (prevMonth: Date) => {
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = (nextMonth: Date) => {
    setCurrentDate(nextMonth);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Navigator
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <Days />
      </div>
      <div className={styles.body}>
        {calendarRange.map((week, idx) => {
          return (
            <div key={idx} className={styles.row}>
              {week.map((date) => {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const eventKey = `${year}-${month}-${day}` as DateString;

                return (
                  <Cell.Root key={eventKey}>
                    <Cell.Header>{day}</Cell.Header>
                    <Cell.Body>
                      {events[eventKey]?.map(({ title }) => <span key={title}>{title}</span>)}
                    </Cell.Body>
                  </Cell.Root>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
