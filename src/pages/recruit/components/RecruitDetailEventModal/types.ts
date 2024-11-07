import type { RecruitEvent } from '../types';

export type RecruitDetailModalProps = {
  isOpen: boolean;
  recruitEvent: RecruitEvent;
  onOpenChange: (open: boolean) => void;
  onEventChange: (eventId: string) => void;
};
