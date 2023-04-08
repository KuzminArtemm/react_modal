import CardForm from './CardForm';
import CardsList from './CardsList';
import SearchCardsForm from './SearchCardsForm';

const { createContext, useState, useEffect } = require('react');

const ContextCards = createContext();

function CardContextProvider() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/cards/')
      .then((response) => response.json())
      .then((dataFromServer) => setCards(dataFromServer));
  }, []);

  const addCard = (newCard) => {
    setCards((prevState) => [...prevState, newCard]);
  };

  const updateCards = (newCardsList) => {
    setCards(newCardsList);
  };

  const deleteCard = (id) => {
    fetch(`http://localhost:3001/api/v1/cards/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.status === 200) {
        setCards((prevState) => prevState.filter((card) => card.id !== id));
      }
    });
  };

  return (
    <ContextCards.Provider value={{ cards, addCard, deleteCard, updateCards }}>
      <CardForm />
      <hr />
      <SearchCardsForm />
      <CardsList />
    </ContextCards.Provider>
  );
}

export default CardContextProvider;

export { ContextCards };
