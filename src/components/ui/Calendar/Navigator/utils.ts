export const convertYearAndMonth = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  return `${year}.${formattedMonth}`;
};
