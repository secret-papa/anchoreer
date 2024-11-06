import styles from './styles.module.scss';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];

export const Days = () => {
  return (
    <div className={styles.root}>
      {days.map((day) => (
        <span key={day} className={styles.day}>
          {day}
        </span>
      ))}
    </div>
  );
};
