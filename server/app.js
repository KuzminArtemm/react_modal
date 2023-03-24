const express = require('express');
const cors = require('cors');
const { db } = require('./DB');
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/cards', (req, res) => {
  const cardsFromServer = db.cards.map(({ email, ...rest }) => rest);
  res.json(cardsFromServer);
});

app.get('/api/v1/cards/:id', (req, res) => {
  const { id } = req.params;

  const personCardsFromServer = db.cards.find((card) => card.id === id);

  if (!personCardsFromServer) {
    return res.sendStatus(404);
  }
  setTimeout(() => {
    res.json(personCardsFromServer);
  }, 250);
});

app.post('/api/v1/cards/', (req, res) => {
  const dataFromClient = req.body;
  // if (!Object.values(dataFromClient).every((value) => !!value)) return res.sendStatus(400)

  console.log('>>>>>>>>>>', req.body);
  const newCard = {
    ...dataFromClient,
    id: uuidv4()
  };

  db.cards.push(newCard);

  return res.json(newCard);
});

app.delete('/api/v1/cards/:id', (req, res) => {
  const { id } = req.params;
  const index = db.cards.findIndex((card) => card.id === id);
  if (index > -1) {
    db.cards.splice(index, 1);
    return res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`The server has been started on port: ${PORT}`);
});
