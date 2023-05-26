const bookModel = require('../models/book.model');

var express = require('express');
var router = express.Router();

/* GET book listing. */
router.get('/list', function (req, res, next) {
  bookModel.find(function (err, booksList) {
    if (err) {
      res.send({ status: 500, message: 'Unable to load books' });
    }
    else {
      const recordCount = booksList.length;
      res.send({ status: 200, recordCount: recordCount, result: booksList });
    }
  });
});

/* GET Trending books */
router.get('/listTrending', function (req, res, next) {
  bookModel.find(function (err, booksList) {
    if (err) {
      res.send({ status: 500, message: 'Unable to load books' });
    }
    else {
      const recordCount = booksList.length;
      res.send({ status: 200, recordCount: recordCount, result: booksList });
    }
  }).skip(10).limit(12);
});

/* GET selected book */
router.get('/view', function (req, res, next) {
  const bookId = req.query.bookId;
  bookModel.findById(bookId, function (err, bookResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find book' });
    }
    else {
      res.send({ status: 200, result: bookResponse });
    }
  });
});

/* Add book */
router.post('/add', function (req, res, next) {
  let _id = req.body._id;
  let Title = req.body.Title;
  let Price = req.body.Price;
  let Genre = req.body.Genre;
  let Author = req.body.Author;
  let Image = req.body.Image;

  let bookObj = new bookModel({
    _id: _id,
    Title: Title,
    Price: Price,
    Genre: Genre,
    Author: Author,
    Image: Image
  });

  bookObj.save(function (err, bookObj) {
    if (err) {
      console.log("err:" + err)
      res.send({ status: 500, message: 'Unable to add book' });
    }
    else {
      res.send({ status: 200, message: 'Added book successfully', bookDetail: bookObj });
    }
  });
});

/* Update book data. */
router.put('/update', function (req, res, next) {
  const bookId = req.body.bookId; 
  let _id = req.body._id;
  let Title = req.body.Title;
  let Price = req.body.Price;
  let Genre = req.body.Genre;
  let Author = req.body.Author;
  let Image = req.body.Image; 
  let bookObj = {
    _id: _id,
    Title: Title,
    Price: Price,
    Genre: Genre,
    Author: Author,
    Image: Image
  };

  bookModel.findByIdAndUpdate(bookId, bookObj, function (err, bookResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to update book' });
    }
    else {
      res.send({ status: 200, message: 'Updated successfully', result: bookObj });
    }
  });
});

/* delete selected user listing. */
router.delete('/delete', function (req, res, next) {
  const bookId = req.query.bookId;

  bookModel.findByIdAndDelete(bookId, function (err, bookResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to find book' });
    }
    else {
      res.send({ status: 200, message: 'Deleted Successfully', result: bookResponse });
    }
  });
});


/* Search books book */
router.get('/search', function (req, res) {
// db.books.find({Title: /.*ENG/})
  const search = req.query.id;
  const id = ".*" + search + ".*"
  bookModel.find({Title: { $regex: id, $options: 'i' }}, function (err, booksList) {
    if (err) {
      res.send({ status: 500, message: 'Unable to search books' });
    }
    else {
      const recordCount = booksList.length;
      res.send({ status: 200, recordCount: recordCount, result: booksList });
    }
  });
});


module.exports = router;

