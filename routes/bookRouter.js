const express = require('express');

function routes (Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
  .post((req,res)=>{
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    const {query} = req
    Book.find(query,(err,books)=>{
      if(err){
        return res.send(err);
      }
      return res.json(books);
    })
  });
  
  // middleware
  bookRouter.use('/books/:bookId',(req, res, next)=>{
    const id = req.params.bookId
      Book.findById(id, (err, book)=>{
        if(err){
          return res.send(err);
        }

        if(book) {
          req.book = book
          return next();
        }

        return res.sendStatus(401);
      })
  })

  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req,res) => {
      const {book} = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();

      return res.json(book);
    })
    .patch((req, res) => {
      const {book} = req;

      if(req.body._id){
        delete req.body._id
      }
      Object.entries(req.body).forEach(([key, value]) => {
        book[key] = value;
      });
      book.save();

      console.log(book);

      return res.json(book);
    })
    .delete((req, res)=>{
      req.book.remove((err)=>{
        if(err) {
          return res.send(err)
        }
        return res.sendStatus(204);
      })
    })

  return bookRouter
}

module.exports = routes