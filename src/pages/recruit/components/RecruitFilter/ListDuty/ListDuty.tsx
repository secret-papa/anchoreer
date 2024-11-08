import styles from './styles.module.scss';
import { DutyButton } from '../DutyButton';
import type { ListDutyProps } from './types';
import { collectIdsWithoutChildren } from '../RecruitFilter';

const isArray1InArray2 = (array1: any[], array2: any[]) => {
  return array1.every((item) => array2.includes(item));
};

export const ListDuty = ({
  list,
  order,
  selectedDuties,
  getDuty,
  onItemSelect,
  onCheckBoxChange,
}: ListDutyProps) => {
  return (
    <div className={styles.root}>
      {list.map((duty) => {
        const checked = !duty.children
          ? selectedDuties.includes(duty.id)
          : isArray1InArray2(collectIdsWithoutChildren(duty.children, getDuty), selectedDuties);

        return (
          <DutyButton
            key={duty.id}
            duty={duty}
            checked={checked}
            onClick={(children) => onItemSelect(children, order)}
            onCheckBoxChange={onCheckBoxChange}
          />
        );
      })}
    </div>
  );
};
