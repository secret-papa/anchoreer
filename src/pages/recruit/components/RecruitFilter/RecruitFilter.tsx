import { useState } from 'react';

import styles from './styles.module.scss';
import { ListDuty } from './ListDuty';
import type { RecruitFilterProps } from './types';

// TODO:: define type
export const collectIdsWithoutChildren = (items: any[], getDuty: any): any[] => {
  let result: number[] = [];

  items.forEach((dutyId) => {
    const duty = getDuty(dutyId);
    // children이 undefined인 경우 id를 result에 추가
    if (!duty.children) {
      result.push(duty.id);
    } else {
      // children이 있는 경우, 재귀적으로 하위 항목을 검사
      result = result.concat(collectIdsWithoutChildren(duty.children, getDuty));
    }
  });

  return result;
};

// TODO:: refactoring
const excludeItems = (array: any, itemsToExclude: any) => {
  return array.filter((item: any) => !itemsToExclude.includes(item));
};

export const RecruitFilter = ({
  selectedDuties,
  duties,
  getDuty,
  onFilterSelect,
}: RecruitFilterProps) => {
  // TODO:: define type
  const [flatDuties, setFlatDuties] = useState<any[]>(() => [
    Object.values(duties)
      .filter((duty: any) => duty.parent_id === null)
      .map(({ id }: any) => id),
  ]);

  const handleCheckBoxChange = (checked: boolean, duty: any) => {
    const duties = !duty.children ? [duty.id] : collectIdsWithoutChildren(duty.children, getDuty);

    if (checked) {
      onFilterSelect(selectedDuties.concat(duties));
    } else {
      onFilterSelect(excludeItems(selectedDuties, duties));
    }
  };

  // TODO:: define type
  const handleItemSelect = (children: any, order: number) => {
    setFlatDuties((prevFlatDuties) => {
      if (!children) {
        return [...prevFlatDuties.slice(0, order + 1)];
      }

      return [...prevFlatDuties.slice(0, order + 1), children];
    });
  };

  return (
    <div className={styles.root}>
      <span className={styles.title}>직무</span>
      <div className={styles.filter_wrap}>
        {flatDuties.map((list, idx) => (
          <ListDuty
            key={idx}
            order={idx}
            list={list.map(getDuty)}
            selectedDuties={selectedDuties}
            getDuty={getDuty}
            onItemSelect={handleItemSelect}
            onCheckBoxChange={handleCheckBoxChange}
          />
        ))}
      </div>
    </div>
  );
};
