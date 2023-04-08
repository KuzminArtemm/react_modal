import { useState } from 'react';

const useDetailCardModal = () => {
  const [viewModal, setViewModal] = useState(false);
  const closeModal = () => {
    setViewModal(false);
  };
  const openModal = () => {
    setViewModal(true);
  };
  return {
    closeModal,
    openModal,
    viewModal
  };
};

export default useDetailCardModal;
