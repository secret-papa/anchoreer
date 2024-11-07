import cn from 'classnames';

import styles from './styles.module.scss';
import { isSameDate } from '../../../../../utils';
import type { EventProps } from './types';

export const Event = ({ date, event, read, onClick }: EventProps) => {
  const isStartRecruit = isSameDate(date, event.startDate);
  const isEndRecruit = isSameDate(date, event.endDate);

  const handleEventClick = () => {
    onClick(event);
  };

  return (
    <button className={styles.root} onClick={handleEventClick}>
      <span
        className={cn(styles.label, {
          [styles.start_label]: isStartRecruit,
          [styles.end_label]: isEndRecruit,
        })}
      >
        {isStartRecruit ? '시' : '끝'}
      </span>
      <span
        className={cn(styles.title, {
          [styles.read]: read,
          [styles.unread]: !read,
        })}
      >
        {event.title}
      </span>
    </button>
  );
};
