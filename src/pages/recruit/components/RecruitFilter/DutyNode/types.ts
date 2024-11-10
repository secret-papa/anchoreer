import type { ReactNode } from 'react';
import type { Duty } from '../../../types';

export type DutyNodeProps = {
  node: Duty;
  children: ReactNode;
  checked?: boolean;
  onClick: (children?: number[]) => void;
  onChange: (checked: boolean, node: Duty) => void;
};
