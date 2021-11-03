const express = require('express');

function routes (Book) {
  const bookRouter = express.Router();
  bookRouter
  .post('/books',(req,res)=>{
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  })
  .get('/books', (req, res) => {
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

  return bookRouter
}

module.exports = routes