import { createContext, useContext } from 'react';
import { ContextProps, ModalContextValue } from './types';

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error('Modal components must be wrapped in <Modal.Container />');
  }

  return context;
};

export const useModal = (props: ContextProps) => ({
  ...props,
});
