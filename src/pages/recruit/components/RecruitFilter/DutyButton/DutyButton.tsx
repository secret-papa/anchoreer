import { useState } from 'react';

import { CheckBox } from '../CheckBox';
import type { DutyButtonProps } from './types';

export const DutyButton = ({ duty, getDuty, onCheckBoxChange }: DutyButtonProps) => {
  const [selected, setSelected] = useState(false);

  const handleDutyButtonClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div>
      <div>
        <CheckBox onCheckChange={(checked) => onCheckBoxChange(checked, duty)} />
        <button onClick={handleDutyButtonClick}>{duty.name}</button>
      </div>
      {selected &&
        !!duty.children?.length &&
        duty.children.map((child: any) => (
          <DutyButton duty={getDuty(child)} getDuty={getDuty} onCheckBoxChange={onCheckBoxChange} />
        ))}
    </div>
  );
};
