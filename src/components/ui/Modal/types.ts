import { useModal } from './hooks';

export type ContextProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export type ModalRootProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export type ModalPortalProps = {
  children: React.ReactNode;
  className?: string;
  container?: Element | (() => Element | null) | null;
};

export type ModalContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalHeaderProps = {
  title?: string;
  className?: string;
};

export type ModalContextValue = ReturnType<typeof useModal>;
