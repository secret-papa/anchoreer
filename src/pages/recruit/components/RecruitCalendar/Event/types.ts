import type { EventProps as CalendarEventProps } from '../../../../../components/ui';
import type { RecruitEvent } from '../../types';

export type EventProps = CalendarEventProps & {
  read?: boolean;
  event: RecruitEvent;
  onClick: (event: RecruitEvent) => void;
};
