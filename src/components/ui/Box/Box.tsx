import styles from './styles.module.css';
import type { BoxProps } from './types';

export const Box = ({ children }: BoxProps) => {
  return <span className={styles.root}>{children}</span>;
};
