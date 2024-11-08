import { useState } from 'react';

import { RecruitCalendar, RecruitFilter } from './components';
import { useListDutyQuery, useListRecruitQuery } from './queries';
import { useDuty, useRecruit } from './hooks';
import { flatten, isDefined, removeDuplicates } from '../../utils';

const RecruitPage = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const { data: listRecruit } = useListRecruitQuery();
  const { getRecruitById, getRecruitsGroupedByDate } = useRecruit(listRecruit);

  // TODO:: define type
  const [selectedDuties, setSelectedDuties] = useState<number[]>([]);
  const { data: listDuty } = useListDutyQuery();
  const { duties, getDuty } = useDuty(listDuty);

  const recruitsGroupedByDate = getRecruitsGroupedByDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const recruits = removeDuplicates(flatten<number>(recruitsGroupedByDate))
    .map(getRecruitById)
    .filter((recruit) => {
      if (!isDefined(recruit)) {
        return false;
      }

      if (selectedDuties.length === 0) {
        return true;
      }

      return selectedDuties.some((duty) => recruit.duty_ids.includes(duty));
    })
    // TODO:: 제거 필요?
    .filter(isDefined);

  const handleCurrentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  const handleRecruitFilterSelect = (duties: number[]) => {
    setSelectedDuties(duties);
  };

  return (
    <div>
      {!!duties && (
        <RecruitFilter
          selectedDuties={selectedDuties}
          duties={duties}
          getDuty={getDuty}
          onFilterSelect={handleRecruitFilterSelect}
        />
      )}
      <RecruitCalendar
        currentDate={currentDate}
        recruits={recruits}
        onCurrentDateChange={handleCurrentDateChange}
        getDuty={getDuty}
      />
    </div>
  );
};

export default RecruitPage;
