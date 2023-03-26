const { db } = require('../../DB');
const { v4: uuidv4 } = require('uuid');

const getAllCards = (req, res) => {
  const cardsFromServer = db.cards.map(({ email, ...rest }) => rest);
  res.json(cardsFromServer);
};

const getPersonCard = (req, res) => {
  const { id } = req.params;

  const personCardsFromServer = db.cards.find((card) => card.id === id);

  if (!personCardsFromServer) {
    return res.sendStatus(404);
  }
  setTimeout(() => {
    res.json(personCardsFromServer);
  }, 250);
};

const createCard = (req, res) => {
  const dataFromClient = req.body;

  if (!Object.values(dataFromClient).every((value) => !!value)) {
    return res.sendStatus(400);
  }

  const newCard = {
    ...dataFromClient,
    id: uuidv4()
  };

  db.cards.push(newCard);

  return res.status(201).json(newCard);
};

const updateCard = (req, res) => {
  const { id } = req.params;

  const currentIndex = db.cards.findIndex((card) => card.id === id);
  if (currentIndex === -1) {
    return res.sendStatus(404);
  }
  if (!Object.values(req.body).every((value) => !!value)) {
    return res.sendStatus(400);
  } else {
    db.cards[currentIndex] = {
      ...db.cards[currentIndex],
      ...req.body
    };
    return res.json(db.cards[currentIndex]);
  }
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  const index = db.cards.findIndex((card) => card.id === id);
  if (index > -1) {
    db.cards.splice(index, 1);
    return res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllCards,
  getPersonCard,
  createCard,
  deleteCard,
  updateCard
};
