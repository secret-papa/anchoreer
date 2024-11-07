import { Fragment } from 'react';

import styles from './styles.module.scss';
import { getCalendarRange } from './utils';
import { Days } from './Days';
import { Cell } from './Cell';
import { Navigator } from './Navigator';
import type { CalendarProps } from './types';
import type { DateString } from '../../../types';

export const Calendar = <T,>({
  currentDate,
  events = {},
  renderEvent,
  onCurrentDateChange,
}: CalendarProps<T>) => {
  const calendarRange = getCalendarRange(currentDate);

  const handlePrevMonth = (prevMonth: Date) => {
    onCurrentDateChange(prevMonth);
  };

  const handleNextMonth = (nextMonth: Date) => {
    onCurrentDateChange(nextMonth);
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
                const formattedMonth = month < 10 ? `0${month}` : month;
                const day = date.getDate();
                const formattedDate = day < 10 ? `0${day}` : day;
                const eventKey = `${year}-${formattedMonth}-${formattedDate}` as DateString;

                return (
                  <Cell.Root key={eventKey}>
                    <Cell.Header>{day}</Cell.Header>
                    <Cell.Body>
                      {events[eventKey]?.map((event, idx) => (
                        <Fragment key={idx}>{renderEvent({ date, event })}</Fragment>
                      ))}
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
