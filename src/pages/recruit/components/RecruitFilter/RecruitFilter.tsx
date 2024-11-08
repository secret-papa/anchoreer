import { CheckBox } from './CheckBox';
import { DutyButton } from './DutyButton';
import type { RecruitFilterProps } from './types';

// TODO:: define type
const collectIdsWithoutChildren = (items: any[], getDuty: any): any[] => {
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
  const rootDuties = Object.values(duties).filter((duty: any) => duty.parent_id === null);

  const handleCheckBoxChange = (checked: boolean, duty: any) => {
    const duties = !duty.children ? [duty.id] : collectIdsWithoutChildren(duty.children, getDuty);

    if (checked) {
      onFilterSelect(selectedDuties.concat(duties));
    } else {
      onFilterSelect(excludeItems(selectedDuties, duties));
    }
  };

  return (
    <div>
      {/* TODO:: define type */}
      {rootDuties.map((duty: any) => {
        return (
          <div key={duty.id}>
            <DutyButton duty={duty} getDuty={getDuty} onCheckBoxChange={handleCheckBoxChange} />
          </div>
        );
      })}
    </div>
  );
};
