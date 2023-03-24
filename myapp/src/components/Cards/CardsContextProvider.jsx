import CardsList from './CardsList';

const { createContext, useState, useEffect } = require('react');

const ContextCards = createContext();

function CardContextProvider() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/cards/')
      .then((response) => response.json())
      .then((dataFromServer) => setCards(dataFromServer));
  }, []);

  return (
    <ContextCards.Provider value={{ cards }}>
      <CardsList />
    </ContextCards.Provider>
  );
}

export default CardContextProvider;

export { ContextCards };
