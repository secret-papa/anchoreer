import styles from './styles.module.scss';
import RightArrowIcon from '../../../../../assets/icons/ic_arrow_right_linear.svg?react';
import { Checkbox } from '../../../../../components/ui';
import type { DutyButtonProps } from './types';

export const DutyButton = ({ duty, checked, onClick, onCheckBoxChange }: DutyButtonProps) => {
  const handleDutyButtonClick = () => {
    onClick(duty.children);
  };

  return (
    <div className={styles.root} onClick={handleDutyButtonClick}>
      <Checkbox checked={checked} onChange={(checked) => onCheckBoxChange(checked, duty)}>
        <span className={styles.duty_name}>{duty.name}</span>
      </Checkbox>
      {!!duty.children?.length && <RightArrowIcon />}
    </div>
  );
};
