import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import type { CheckboxProps } from './types';

export const Checkbox = ({ checked = false, children, name, onChange }: CheckboxProps) => {
  const [_checked, _setChecked] = useState(checked);

  const toggle = () => {
    _setChecked((prev) => !prev);
    onChange?.(!_checked);
  };

  useEffect(() => {
    _setChecked(checked);
  }, [checked]);

  return (
    <div className={styles.root}>
      <input hidden tabIndex={-1} type="checkbox" name={name} defaultChecked={_checked} />
      <button type="button" className={styles.button} onClick={toggle}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.405 12.232L7.395 11.242L10.527 14.374L16.605 8.295L17.595 9.286L10.527 16.354L6.405 12.232ZM22 12C22 6.486 17.514 2 12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12Z"
            fill={_checked ? '#ff6813' : '#999999'}
          />
        </svg>
      </button>
      {children}
    </div>
  );
};
