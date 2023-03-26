const express = require('express');
const cors = require('cors');
const { cardsRouter } = require('./src/routes/cardsRouter');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/cards', cardsRouter)

app.listen(PORT, () => {
  console.log(`The server has been started on port: ${PORT}`);
});
