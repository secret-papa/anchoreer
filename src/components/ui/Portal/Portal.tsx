import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { getContainer } from './utils';
import type { PortalProps } from './types';

export const Portal = ({ children, container = document?.body }: PortalProps) => {
  const [mountNode, setMountNode] = useState<ReturnType<typeof getContainer>>(null);

  useEffect(() => {
    setMountNode(getContainer(container));
  }, [container]);

  return <>{mountNode ? createPortal(children, mountNode) : mountNode}</>;
};
