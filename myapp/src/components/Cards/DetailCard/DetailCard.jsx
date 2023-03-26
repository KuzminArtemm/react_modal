import React, { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Modal from '../../Modal';
import CommonForm from '../CommonForm';

import './style.css';

export default function DetailCard() {
  const { cardsId } = useParams();
  const controller = useRef(new AbortController());
  const [card, setCard] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `http://localhost:3001/api/v1/cards/${cardsId}` /* {
      signal: controller.current.signal
    } */
    )
      .then((response) => response.json())
      .then((dataFromserver) => setCard(dataFromserver));

    return () => {
      controller.current.abort();
    };
  }, []);

  const openModal = () => {
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const response = await fetch(
      `http://localhost:3001/api/v1/cards/${card.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );
    if (response.status === 200) {
      const updatedCardFromServer = await response.json();
      setCard(updatedCardFromServer);
      closeModal();
      e.target.reset();
    } else {
      alert('Wrong data');
      e.target.reset();
    }
  };

  const content = () => {
    if (!card.id) {
      return <strong>Loading...</strong>;
    } else {
      return (
        <React.Fragment>
          <div className="card" style={{ width: '24rem' }}>
            <img src={card.avatar} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Name: {card.name}</h5>
              <p className="card-text">{card.superability}</p>
            </div>
            <div className="button">
              <button
                onClick={() => navigate(-1)}
                type="button"
                class="btn btn-light first"
              >
                Return
              </button>
              <button
                onClick={openModal}
                type="button"
                className="btn btn-info second"
              >
                Edit
              </button>
            </div>
          </div>
          <Modal state={viewModal} onClose={closeModal}>
            <CommonForm onSubmit={submitHandler} {...card} />
          </Modal>
        </React.Fragment>
      );
    }
  };

  return <div className="d-flex justify-content-center">{content()}</div>;
}
