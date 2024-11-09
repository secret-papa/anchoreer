import type { Duty } from '../../../types';

export const collectLeafNodeIds = (
  nodeIds: number[],
  getNodeById: (id: number) => Duty | undefined
): number[] => {
  let result: number[] = [];

  nodeIds.forEach((dutyId) => {
    const duty = getNodeById(dutyId);

    if (!duty) {
      return;
    }

    if (!duty.children) {
      result.push(duty.id);
    } else {
      result = result.concat(collectLeafNodeIds(duty.children, getNodeById));
    }
  });

  return result;
};
