import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function DetailCard() {
  const { cardsId } = useParams();
  const controller = useRef(new AbortController());
  const [card, setCard] = useState({});
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

  const content = () => {
    if (!card.id) {
      return <strong>Loading...</strong>;
    } else {
      return (
        <div className="card" style={{ width: '24rem' }}>
          <img src={card.avatar} className="card-img-top r-2" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Name: {card.name}</h5>
            <p className="card-text">{card.superability}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            type="button"
            class="btn btn-light"
          >
            Return
          </button>
        </div>
      );
    }
  };

  return <div className="d-flex justify-content-center">{content()}</div>;
}
