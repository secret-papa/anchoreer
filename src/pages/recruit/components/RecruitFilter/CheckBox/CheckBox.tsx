import { useEffect, useState } from 'react';

import type { CheckBoxProps } from './types';

// TODO:: move common ui
export const CheckBox = ({ onCheckChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheckButtonClick = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    onCheckChange(checked);
  }, [checked]);

  return <button onClick={handleCheckButtonClick}>{checked ? 'Checked' : 'UnChecked'}</button>;
};
