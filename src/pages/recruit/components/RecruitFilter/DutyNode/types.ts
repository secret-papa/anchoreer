import type { Duty } from '../../../types';

export type DutyNodeProps = {
  node: Duty;
  checked?: boolean;
  onClick: (children?: number[]) => void;
  onChange: (checked: boolean, node: Duty) => void;
};
