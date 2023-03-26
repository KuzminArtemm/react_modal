import { useEffect } from 'react';

import ReactDOM from 'react-dom';

import styles from './modal.module.css';

export default function Modal({ children, state, ...rest }) {
  return ReactDOM.createPortal(
    state && <ModalInner {...rest}>{children}</ModalInner>,
    document.getElementById('modal-root')
  );
}

function ModalInner({ children, onClose, state }) {
  const escapeHandler = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.document.addEventListener('keydown', escapeHandler);

    return () => {
      window.document.removeEventListener('keydown', escapeHandler);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
