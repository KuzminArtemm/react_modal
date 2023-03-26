import { useContext } from 'react';

import { ContextCards } from '../CardsContextProvider';
import CommonForm from '../CommonForm';

const CardForm = () => {
  const { addCard } = useContext(ContextCards);
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const response = await fetch('http://localhost:3001/api/v1/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.status === 201) {
      const responseFromServer = await response.json();
      addCard(responseFromServer);
      e.target.reset();
    } else {
      alert('Wrong data');
      e.target.reset();
    }
  };

  return <CommonForm onSubmit={submitHandler} />;
};

export default CardForm;
