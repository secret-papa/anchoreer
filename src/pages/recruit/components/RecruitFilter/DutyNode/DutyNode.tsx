import styles from './styles.module.scss';
import RightArrowIcon from '../../../../../assets/icons/ic_arrow_right_linear.svg?react';
import { Checkbox } from '../../../../../components/ui';
import type { DutyNodeProps } from './types';

export const DutyNode = ({ node, children, checked, onClick, onChange }: DutyNodeProps) => {
  const handleDutyButtonClick = () => {
    onClick(node.children);
  };

  const handleNodeChange = (checked: boolean) => {
    onChange(checked, node);
  };

  return (
    <div className={styles.root} onClick={handleDutyButtonClick}>
      <Checkbox checked={checked} onChange={handleNodeChange}>
        {children}
      </Checkbox>
      {!!node.children?.length && <RightArrowIcon />}
    </div>
  );
};
