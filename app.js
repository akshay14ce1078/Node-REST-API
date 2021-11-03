const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;

const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my NodeJS API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
