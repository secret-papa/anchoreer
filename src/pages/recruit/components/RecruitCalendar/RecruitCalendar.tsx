import { Event } from './Event';
import { makeEvents } from './utils';
import { Calendar } from '../../../../components/ui';
import type { RecruitCalendarProps } from './types';

export const RecruitCalendar = ({
  currentDate,
  recruits,
  onCurrentDateChange,
}: RecruitCalendarProps) => {
  const events = makeEvents(recruits);

  return (
    <Calendar
      currentDate={currentDate}
      events={events}
      renderEvent={Event}
      onCurrentDateChange={onCurrentDateChange}
    />
  );
};
