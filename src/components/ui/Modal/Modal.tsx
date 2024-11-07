import cn from 'classnames';

import styles from './styles.module.scss';
import CloseIcon from '../../../assets/icons/close.svg?react';
import { ModalContext, useModalContext } from './hooks';
import { Portal as PrimitivePortal } from '../Portal';
import { useScrollBlock } from '../../../hooks';
import type {
  ModalContainerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalPortalProps,
  ModalRootProps,
} from './types';

const Root = ({ children, isOpen, onOpenChange }: ModalRootProps) => (
  <ModalContext.Provider value={{ isOpen, onOpenChange }}>{children}</ModalContext.Provider>
);

Root.displayName = 'Modal.Root';

const Portal = ({ children, className, container }: ModalPortalProps) => {
  const { isOpen } = useModalContext();

  return (
    <>
      {isOpen && (
        <PrimitivePortal container={container}>
          <div className={cn(styles.portal, className)}>{children}</div>
        </PrimitivePortal>
      )}
    </>
  );
};

Portal.displayName = 'Modal.Portal';

const Overlay = () => {
  const { isOpen, onOpenChange } = useModalContext();

  const handleOverlayClick = () => {
    onOpenChange(false);
  };

  useScrollBlock(isOpen);

  return <div className={styles.overlay} onClick={handleOverlayClick} />;
};

Overlay.displayName = 'Modal.Overlay';

const Container = ({ children, className }: ModalContainerProps) => (
  <section className={cn(styles.container, className)}>{children}</section>
);

Container.displayName = 'Modal.Container';

const Header = ({ className }: ModalHeaderProps) => {
  const { onOpenChange } = useModalContext();

  const handleCloseButtonClick = () => {
    onOpenChange(false);
  };

  return (
    <header className={cn(styles.header, className)}>
      <button className={styles.close_button} onClick={handleCloseButtonClick}>
        <CloseIcon />
      </button>
    </header>
  );
};

Header.displayName = 'Modal.Header';

const Content = ({ children, className }: ModalContentProps) => (
  <div className={cn(styles.content, className)}>{children}</div>
);

Content.displayName = 'Modal.Content';

export const Modal = {
  Root,
  Portal,
  Overlay,
  Container,
  Content,
  Header,
};
