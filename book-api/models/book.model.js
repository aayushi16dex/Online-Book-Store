const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  _id: String,
  title: String,
  price: Number,
  genre: Array,
  author: Array,
  image: String,
  rating: Number,
  reviews: [{ userId: mongoose, rating: Number, review: String, date: Date }],
});

const bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
