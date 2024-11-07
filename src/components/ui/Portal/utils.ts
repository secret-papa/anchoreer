import type { PortalProps } from './types';

export const getContainer = (container: PortalProps['container']) => {
  return typeof container === 'function' ? container() : container;
};
