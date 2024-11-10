import styles from './styles.module.scss';
import { collectLeafNodeIds } from './utils';
import { DutyNode } from '../DutyNode';
import { useDutyStore } from '../../../stores';
import { countMatches, excludeItems } from '../../../../../utils';
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
        const leafNodeIds = collectLeafNodeIds(
          !node.children ? [node.id] : node.children,
          getDutyById
        );

        const matchingCount = countMatches(selectedNodes, leafNodeIds);

        return (
          <DutyNode
            key={node.id}
            node={node}
            checked={matchingCount === leafNodeIds.length}
            onClick={handleNodeClick}
            onChange={handleNodeChange}
          >
            <div className={styles.node_wrap}>
              <span className={styles.node_name}>{node.name}</span>
              {!!matchingCount && !!node.children && (
                <span className={styles.node_badge}>{matchingCount}</span>
              )}
            </div>
          </DutyNode>
        );
      })}
    </div>
  );
};
