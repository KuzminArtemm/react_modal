import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

import { useCardDetailContext } from '../DetailCard';

const cardVariants = {
  start: {
    opacity: 0
    /* y: 100,
    rotate: 180 */
  },
  end: {
    opacity: 1,
    /* y: 0,
    rotate: 0, */
    transition: {
      duration: 1
      /* rotate: {
        duration: 1
      } */
    }
  }
};

const CardDetailSingleCard = ({ a }) => {
  const [card, setCard] = useState({});
  const { openModal } = useCardDetailContext();
  const { cardsId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/cards/${cardsId}`)
      .then((response) => response.json())
      .then((dataFromserver) => setCard(dataFromserver));
  }, []);

  return (
    <React.Fragment>
      <motion.div
        variants={cardVariants}
        initial="start"
        animate="end"
        className="card"
        style={{ width: '24rem' }}
      >
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
      </motion.div>
    </React.Fragment>
  );
};

export default CardDetailSingleCard;
