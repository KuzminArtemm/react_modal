import { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';

import styles from './modal.module.css';
import { modalInnerVariants, modalWrVariants } from './modalAnimation';

export default function Modal({ children, state, ...rest }) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {state && <ModalInner {...rest}>{children}</ModalInner>}
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
}

function ModalInner({ children, onClose, state }) {
  console.log('ModalInner', children);
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

  const wrClickHandler = () => {
    onClose();
  };

  const innerCancelClickHahdler = () => {
    onClose();
  };

  const innerStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      variants={modalWrVariants}
      initial="start"
      animate="show"
      exit="end"
      onClick={wrClickHandler}
      className={styles.wrapper}
    >
      <motion.div
        variants={modalInnerVariants}
        onClick={innerStopPropagation}
        className={styles.inner}
      >
        <svg
          onClick={innerCancelClickHahdler}
          role="button"
          className={`bi bi-x ${styles.cancel}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        {children}
      </motion.div>
    </motion.div>
  );
}
