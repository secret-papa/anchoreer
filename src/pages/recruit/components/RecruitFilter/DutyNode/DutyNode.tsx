import styles from './styles.module.scss';
import RightArrowIcon from '../../../../../assets/icons/ic_arrow_right_linear.svg?react';
import { Checkbox } from '../../../../../components/ui';
import type { DutyNodeProps } from './types';

export const DutyNode = ({ node, checked, onClick, onChange }: DutyNodeProps) => {
  const handleDutyButtonClick = () => {
    onClick(node.children);
  };

  const handleNodeChange = (checked: boolean) => {
    onChange(checked, node);
  };

  return (
    <div className={styles.root} onClick={handleDutyButtonClick}>
      <Checkbox checked={checked} onChange={handleNodeChange}>
        <span className={styles.name}>{node.name}</span>
      </Checkbox>
      {!!node.children?.length && <RightArrowIcon />}
    </div>
  );
};
