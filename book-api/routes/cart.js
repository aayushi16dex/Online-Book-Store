const cartModel = require('../models/cart.model');
const bookModel = require('../models/book.model');
var express = require('express');
var router = express.Router();

/* GET single user cart */
router.get('/viewCart', function (req, res) {
  let email = req.query.email;
  cartModel.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "cart.bookId",
        foreignField: "_id",
        as: "cartInfo"
      }
    },
    {
      $project: {
        "_id": 1,
        "cart": 1,
        "cartInfo.Title": 1,
        "cartInfo.Price": 1,
        "cartInfo.Image": 1,
        "cartInfo._id": 1
      }
    },
    {
      $match: {
        "_id": email
      }
    }
  ], function (err, cartResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to join' });
    }
    else {
      res.send({ status: 200, message: "Joined successfully", result: cartResponse });
    }
  });
});

/* Add empty cart for new user on registering */
router.post('/regCart', function (req, res) {
  let _id = req.body._id;   //email
  let cart = [];

  let cartObj = new cartModel({
    _id: _id,
    cart: cart
  });

  cartObj.save(function (err, cartObj) {
    if (err) {
      res.send({ status: 500, message: 'Unable to create cart' });
    }
    else {
      res.send({ status: 200, message: 'Cart created successfully', cartDetail: cartObj });
    }
  });
});

/* Add items to cart for existing user */
router.put('/addItem', function (req, res) {
  const _id = req.body._id;
  let { bookId } = req.body;
  cartModel.findByIdAndUpdate(
    { _id: _id },
    { $push: { cart: { bookId } } },
    function (err, cartObj) {
      if (err) {
        res.send({ status: 500, message: 'Unable to add to cart' });
      } else {
        res.send({ status: 200, message: 'Added book successfully to the cart', cartDetail: cartObj });
      }
    });
});

/* delete a cart item*/
router.put('/delete', function (req, res) {
  const _id = req.body._id;     //email
  let bookToRemove = req.body.bookId;

  cartModel.findByIdAndUpdate(
    { _id: _id },
    { $pull: { cart: { bookId: bookToRemove } } },
    function (err, cartObj) {
      if (err) {
        res.send({ status: 500, message: 'Unable to delete' });
      } else {
        res.send({ status: 200, message: 'Deleted book successfully from the cart', cartDetail: cartObj });
      }
    });
});

/* delete entire cart after purchasing*/
router.put('/deleteCart', function (req, res) {
  const _id = req.body.email;     //email

  cartModel.findByIdAndUpdate(
    { _id: _id },
    { $set: { cart: [] } },
    function (err, cartObj) {
      if (err) {
        res.send({ status: 500, message: 'Unable to delete cart' });
      } else {
        res.send({ status: 200, message: 'Deleted cart successfully', cartDetail: cartObj });
      }
    });
});

module.exports = router;

