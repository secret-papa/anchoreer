import { useState } from 'react';

import { RecruitCalendar } from './components';
import { useListRecruitQuery } from './queries';
import { useRecruit } from './hooks';
import { flatten, isDefined, removeDuplicates } from '../../utils';

const RecruitPage = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const { data: listRecruit } = useListRecruitQuery();
  const { getRecruitById, getRecruitsGroupedByDate } = useRecruit(listRecruit);

  const recruitsGroupedByDate = getRecruitsGroupedByDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const recruits = removeDuplicates(flatten<number>(recruitsGroupedByDate))
    .map(getRecruitById)
    .filter(isDefined);

  const handleCurrentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  return (
    <RecruitCalendar
      currentDate={currentDate}
      recruits={recruits}
      onCurrentDateChange={handleCurrentDateChange}
    />
  );
};

export default RecruitPage;
