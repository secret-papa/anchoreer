import cn from 'classnames';

import styles from './styles.module.scss';
import RightChevronIcon from '../../../../assets/icons/ic_right_chevron.svg?react';
import LeftChevronIcon from '../../../../assets/icons/ic_left_chevron.svg?react';
import { Modal } from '../../../../components/ui';
import type { RecruitDetailModalProps } from './types';
import { useDutyStore } from '../../stores';

export const RecruitDetailEventModal = ({
  isOpen,
  recruitEvent,
  onOpenChange,
  onEventChange,
}: RecruitDetailModalProps) => {
  const { recruit, prevEvent, nextEvent } = recruitEvent.meta ?? {};

  const getDutyById = useDutyStore((state) => state.getById);

  const handlePrevEventButtonClick = () => {
    if (!prevEvent) {
      return;
    }

    onEventChange(prevEvent);
  };

  const handleNextEventButtonClick = () => {
    if (!nextEvent) {
      return;
    }

    onEventChange(nextEvent);
  };

  if (!recruit) {
    return null;
  }

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Portal className={styles.portal}>
        <Modal.Overlay />
        <Modal.Container className={styles.container}>
          <Modal.Header />
          <Modal.Content>
            <div className={styles.content_header}>
              <span className={styles.company_name}>{recruit.company_name}</span>
              <h2 className={styles.title}>{recruit.title}</h2>
            </div>
            <div className={styles.content_detail}>
              <span className={styles.period}>{`${recruit.start_time} ~ ${recruit.end_time}`}</span>
              <span className={styles.duty}>
                {recruit.duty_ids.map((duty) => getDutyById(duty)?.name).join(', ')}
              </span>
            </div>
            <div className={styles.content_image_wrap}>
              <img className={styles.image} src={recruit.image_url} />
            </div>
          </Modal.Content>
          {!!prevEvent && (
            <button
              className={cn(styles.navigation_button, styles.left)}
              onClick={handlePrevEventButtonClick}
            >
              <LeftChevronIcon />
            </button>
          )}
          {!!nextEvent && (
            <button
              className={cn(styles.navigation_button, styles.right)}
              onClick={handleNextEventButtonClick}
            >
              <RightChevronIcon />
            </button>
          )}
        </Modal.Container>
      </Modal.Portal>
    </Modal.Root>
  );
};
