import styles from './styles.module.scss';
import type { CellBodyProps, CellHeaderProps, CellRootProps } from './types';

const Root = ({ children }: CellRootProps) => {
  return <div className={styles.root}>{children}</div>;
};

Root.displayName = 'Cell.Root';

const Header = ({ children }: CellHeaderProps) => {
  return <div className={styles.header}>{children}</div>;
};

Header.displayName = 'Cell.Header';

const Body = ({ children }: CellBodyProps) => {
  return <div className={styles.body}>{children}</div>;
};

Body.displayName = 'Cell.Body';

export const Cell = {
  Root,
  Header,
  Body,
};
