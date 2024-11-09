import type { Duty } from '../../../types';

export type DutyHierarchyProps = {
  level: number;
  nodes: Duty[];
  selectedNodes: number[];
  onNodeClick: (order: number, children?: number[]) => void;
  onNodeChange: (nodeIds: number[]) => void;
};
