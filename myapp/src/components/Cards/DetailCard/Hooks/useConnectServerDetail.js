import { useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

const useConnectServerDetail = (closeModal) => {
  const { cardsId } = useParams();
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({});

  useLayoutEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/v1/cards/${cardsId}`)
      .then((response) => response.json())
      .then((dataFromserver) => setCard(dataFromserver))
      .finally(() => setLoading(false));
  }, []);

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

  return {
    card,
    submitHandler,
    loading
  };
};

export default useConnectServerDetail;
