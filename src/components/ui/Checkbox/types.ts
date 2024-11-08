import type { ReactNode } from 'react';

export type CheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  children?: ReactNode;
  onChange?: (checked: boolean) => void;
};
