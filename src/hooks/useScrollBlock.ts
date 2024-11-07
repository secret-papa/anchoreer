import { useEffect } from 'react';

export const useScrollBlock = (enabled: boolean) => {
  useEffect(() => {
    document.body.style.overflow = enabled ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [enabled]);
};
