export const getCalendarRange = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDay = getStartDay(year, month);
  const endDay = getEndDay(year, month);

  return groupDatesByWeek(startDay, endDay);
};

const getStartDay = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  return startDay;
};

const getEndDay = (year: number, month: number) => {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  return endDay;
};

const groupDatesByWeek = (startDay: Date, endDay: Date) => {
  const weeks = [];
  let currentWeek = [];
  const currentDate = new Date(startDay);

  while (currentDate <= endDay) {
    currentWeek.push(new Date(currentDate));
    if (currentWeek.length === 7 || currentDate.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};
