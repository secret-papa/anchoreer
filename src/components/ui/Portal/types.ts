import type { ReactNode } from 'react';

export type PortalProps = {
  children: ReactNode;
  container?: Element | (() => Element | null) | null;
};
