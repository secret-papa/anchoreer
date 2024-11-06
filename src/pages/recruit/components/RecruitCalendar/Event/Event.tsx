import cn from 'classnames';

import styles from './styles.module.scss';
import { isSameDate } from '../../../../../utils';
import type { EventProps } from '../../../../../components/ui';

export const Event = ({ date, event }: EventProps) => {
  const isStartRecruit = isSameDate(date, event.startDate);
  const isEndRecruit = isSameDate(date, event.endDate);

  return (
    <div className={styles.root}>
      <span
        className={cn(styles.label, {
          [styles.start_label]: isStartRecruit,
          [styles.end_label]: isEndRecruit,
        })}
      >
        {isStartRecruit ? '시' : '끝'}
      </span>
      <span className={styles.title}>{event.title}</span>
    </div>
  );
};
