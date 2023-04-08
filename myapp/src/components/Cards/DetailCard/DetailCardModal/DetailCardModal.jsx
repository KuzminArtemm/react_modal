import Modal from '../../../Modal';
import CommonForm from '../../CommonForm';
import { useCardDetailContext } from '../DetailCard';

const DetailCardModal = () => {
  const { closeModal, card, viewModal, submitHandler } = useCardDetailContext();
  return (
    <Modal state={viewModal} onClose={closeModal}>
      <CommonForm onSubmit={submitHandler} {...card} />
    </Modal>
  );
};

export default DetailCardModal;
