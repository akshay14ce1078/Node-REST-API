const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Book Controller Test:', () => {
  describe('Post', () => {

    function MockBook() {
      this.save = () => {}; // mock save
    }

    const req = {
      body: {
        author: 'Akshay'
      }
    };

    const res = {
      status: sinon.spy(),
      send: sinon.spy(),
      json: sinon.spy()
    };

    const controller = bookController(MockBook);

    it('should not allow empty title', () => {
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });

    it('should submit post request when book has title', () => {
      const reqWithTitle = {
        body: {
          author: 'Akshay',
          title: 'BookTestTitle'
        }
      };
      controller.post(reqWithTitle, res);

      res.status.calledWith(201).should.equal(true);
    });
  });
});
