import { useState } from 'react';

import styles from './styles.module.scss';
import { DutyHierarchy } from './DutyHierarchy';
import { getRootDuties } from './utils';
import { useDutyStore } from '../../stores';
import { isDefined } from '../../../../utils';
import type { RecruitFilterProps } from './types';

export const RecruitFilter = ({ filteredIds, duties, onFilter }: RecruitFilterProps) => {
  const [dutiesByHierarchy, setDutiesByHierarchy] = useState<number[][]>(() => [
    getRootDuties(duties),
  ]);

  const getDutyById = useDutyStore((state) => state.getById);

  const handleNodeChange = (nodeIds: number[]) => {
    onFilter(nodeIds);
  };

  const handleNodeClick = (level: number, children?: number[]) => {
    setDutiesByHierarchy((prevDuties) => {
      const slicedDuties = prevDuties.slice(0, level + 1);
      return children ? [...slicedDuties, children] : slicedDuties;
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>직무</span>
        {!!filteredIds.length && <span className={styles.tag}>{filteredIds.length}</span>}
      </div>
      <div className={styles.container}>
        {dutiesByHierarchy.map((duties, idx) => (
          <DutyHierarchy
            key={idx}
            level={idx}
            nodes={duties.map(getDutyById).filter(isDefined)}
            selectedNodes={filteredIds}
            onNodeClick={handleNodeClick}
            onNodeChange={handleNodeChange}
          />
        ))}
      </div>
    </div>
  );
};
