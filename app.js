const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

const Book = require('./models/bookModel.js');

bookRouter.get('/books', (req, res) => {
  const {query} = req
  Book.find(query,(err,books)=>{
    if(err){
      return res.send(err);
    }
    return res.json(books);
  })
});

bookRouter.get('/books/:bookId', (req, res) => {
  const id = req.params.bookId
  Book.findById(id,(err,books)=>{
    if(err){
      return res.send(err);
    }
    return res.json(books);
  })
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my NodeJS API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
