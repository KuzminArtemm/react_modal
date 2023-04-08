const express = require('express');
const {
  getAllCards,
  getPersonCard,
  createCard,
  deleteCard,
  updateCard
} = require('../controllers/cardsControllers');

const cardsRouter = express.Router();

cardsRouter.route('/').get(getAllCards).post(createCard);

cardsRouter
  .route('/:id')
  .get(getPersonCard)
  .patch(updateCard)
  .delete(deleteCard);

module.exports = {
  cardsRouter
};
