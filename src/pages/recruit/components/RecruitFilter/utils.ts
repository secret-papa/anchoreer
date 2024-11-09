import type { Duty } from '../../types';

export const getRootDuties = (duties: Record<number, Duty>) => {
  return Object.values(duties)
    .filter((duty) => duty.parent_id === null)
    .map(({ id }) => id);
};
