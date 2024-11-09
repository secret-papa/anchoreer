import { useState } from 'react';

import { Event } from './Event';
import { useRecruitEvents } from './hooks';
import { RecruitDetailEventModal } from '../RecruitDetailEventModal';
import { Calendar } from '../../../../components/ui';
import { isDefined } from '../../../../utils';
import type { RecruitCalendarProps } from './types';
import type { RecruitEvent } from '../types';

export const RecruitCalendar = ({
  currentDate,
  recruits,
  onCurrentDateChange,
}: RecruitCalendarProps) => {
  const [isRecruitDetailModalOpen, setIsRecruitDetailModalOpen] = useState(false);
  const { events, selectedEvent, readEvents, getEvent, selectEvent } = useRecruitEvents(recruits);

  const handleRecruitDetailModalOpenChange = (open: boolean) => {
    setIsRecruitDetailModalOpen(open);
  };

  const handleEventClick = (event: RecruitEvent) => {
    selectEvent(event);
    setIsRecruitDetailModalOpen(true);
  };

  const handleEventChange = (eventId: string) => {
    const event = getEvent(eventId);
    if (!event) {
      return;
    }
    selectEvent(event);
  };

  return (
    <div>
      <Calendar
        currentDate={currentDate}
        events={events}
        renderEvent={({ event, date }) => {
          const read = readEvents?.[event.meta?.recruit.id ?? ''] ?? false;

          return <Event read={read} event={event} date={date} onClick={handleEventClick} />;
        }}
        onCurrentDateChange={onCurrentDateChange}
      />
      {isDefined(selectedEvent) && (
        <RecruitDetailEventModal
          isOpen={isRecruitDetailModalOpen}
          recruitEvent={selectedEvent}
          onOpenChange={handleRecruitDetailModalOpenChange}
          onEventChange={handleEventChange}
        />
      )}
    </div>
  );
};
