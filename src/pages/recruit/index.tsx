import { useState } from 'react';

import styles from './styles.module.scss';
import { RecruitCalendar, RecruitFilter } from './components';
import { useListDutyQuery } from './queries';
import { useDuty, useRecruit } from './hooks';

const RecruitPage = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDuties, setSelectedDuties] = useState<number[]>([]);
  const { data: listDuty } = useListDutyQuery();
  const { duties, getDuty } = useDuty(listDuty);

  const { recruits } = useRecruit(currentDate, selectedDuties);

  const handleCurrentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  const handleRecruitFilterSelect = (duties: number[]) => {
    setSelectedDuties(duties);
  };

  return (
    <main>
      <header className={styles.header}>
        <img src="https://d2bovrvbszerbl.cloudfront.net/assets/logo/logo_landscape-01bd6c93380effd6467ebc566cd6b4b8afd436b716be616dbde484ab28828423.svg" />
      </header>
      <div className={styles.filter}>
        {!!duties && (
          <RecruitFilter
            selectedDuties={selectedDuties}
            duties={duties}
            getDuty={getDuty}
            onFilterSelect={handleRecruitFilterSelect}
          />
        )}
      </div>
      <RecruitCalendar
        currentDate={currentDate}
        recruits={recruits}
        onCurrentDateChange={handleCurrentDateChange}
        // TODO:: refactoring
        getDuty={getDuty}
      />
    </main>
  );
};

export default RecruitPage;
