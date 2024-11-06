export type NavigatorProps = {
  currentDate: Date;
  onPrevMonth: (prevMonth: Date) => void;
  onNextMonth: (nextMonth: Date) => void;
};
