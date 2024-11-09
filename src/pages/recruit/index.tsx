import { useState } from 'react';

import styles from './styles.module.scss';
import { RecruitCalendar, RecruitFilter } from './components';
import { useDuty, useRecruit } from './hooks';
import { isEmptyObject } from '../../utils';
import { Logo } from '../../components/ui';

const RecruitPage = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [idsForRecruitFilter, setIdsForRecruitFilter] = useState<number[]>([]);

  const { recruits } = useRecruit({ date: currentDate, ids: idsForRecruitFilter });
  const { duties } = useDuty();

  const handleCurrentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  const handleRecruitFilter = (idsForFilter: number[]) => {
    setIdsForRecruitFilter(idsForFilter);
  };

  return (
    <main>
      <header className={styles.header}>
        <Logo />
      </header>
      <div className={styles.filter_wrap}>
        {!isEmptyObject(duties) && (
          <RecruitFilter
            duties={duties}
            filteredIds={idsForRecruitFilter}
            onFilter={handleRecruitFilter}
          />
        )}
      </div>
      <RecruitCalendar
        currentDate={currentDate}
        recruits={recruits}
        onCurrentDateChange={handleCurrentDateChange}
      />
    </main>
  );
};

export default RecruitPage;
