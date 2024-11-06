import styles from './styles.module.scss';
import ArrowLeft from '../../../../assets/icons/ic_arrow_left_linear.svg?react';
import ArrowRight from '../../../../assets/icons/ic_arrow_right_linear.svg?react';
import { convertYearAndMonth } from './utils';
import type { NavigatorProps } from './types';

export const Navigator = ({ currentDate, onPrevMonth, onNextMonth }: NavigatorProps) => {
  const yearAndMonth = convertYearAndMonth(currentDate);

  const handlePrevMonthButtonClick = () => {
    onPrevMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonthButtonClick = () => {
    onNextMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={handlePrevMonthButtonClick}>
        <ArrowLeft />
      </button>
      <span className={styles.date}>{yearAndMonth}</span>
      <button className={styles.button} onClick={handleNextMonthButtonClick}>
        <ArrowRight />
      </button>
    </div>
  );
};
