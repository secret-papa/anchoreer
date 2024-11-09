import styles from './styles.module.scss';
import { collectLeafNodeIds } from './utils';
import { DutyNode } from '../DutyNode';
import { useDutyStore } from '../../../stores';
import { excludeItems, isSubsetArray } from '../../../../../utils';
import type { DutyHierarchyProps } from './types';
import type { Duty } from '../../../types';

export const DutyHierarchy = ({
  level,
  nodes,
  selectedNodes,
  onNodeClick,
  onNodeChange,
}: DutyHierarchyProps) => {
  const getDutyById = useDutyStore((state) => state.getById);

  const handleNodeClick = (children?: number[]) => {
    onNodeClick(level, children);
  };

  const handleNodeChange = (checked: boolean, node: Duty) => {
    const nodes = node.children ? collectLeafNodeIds(node.children, getDutyById) : [node.id];

    onNodeChange(checked ? selectedNodes.concat(nodes) : excludeItems(selectedNodes, nodes));
  };

  return (
    <div className={styles.root}>
      {nodes.map((node) => {
        const checked = !node.children
          ? selectedNodes.includes(node.id)
          : isSubsetArray(collectLeafNodeIds(node.children, getDutyById), selectedNodes);

        return (
          <DutyNode
            key={node.id}
            node={node}
            checked={checked}
            onClick={handleNodeClick}
            onChange={handleNodeChange}
          />
        );
      })}
    </div>
  );
};
