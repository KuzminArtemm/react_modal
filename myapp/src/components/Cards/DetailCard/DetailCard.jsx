import React, { createContext, useContext } from 'react';

import CardDetailSingleCard from './CardDetailSingleCard/CardDetailSingleCard';
import DetailCardModal from './DetailCardModal';
import useConnectServerDetail from './Hooks/useConnectServerDetail';
import useDetailCardModal from './Hooks/useDetailCardModal';
import './style.css';
import withLoader from '../../hocs/withLoader';

const CardDetailContext = createContext();

const DetailCardWithLoader = withLoader(CardDetailSingleCard);

export default function DetailCard() {
  const { closeModal, openModal, viewModal } = useDetailCardModal();
  const { card, submitHandler, loading } = useConnectServerDetail(closeModal);

  /* const sharedValue = useMemo(
    () => ({
      closeModal,
      openModal,
      submitHandler,
      viewModal,
      card,
      loading
    }),
    [viewModal, card]
  ); */

  return (
    <CardDetailContext.Provider
      value={{ closeModal, openModal, submitHandler, viewModal, card, loading }}
    >
      <div className="d-flex justify-content-center">
        <DetailCardWithLoader loading={loading} a={2} />
        <DetailCardModal />
      </div>
    </CardDetailContext.Provider>
  );
}

export const useCardDetailContext = () => {
  return useContext(CardDetailContext);
};
