const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    _id: String,
    Title: String,
    Price: Number,
    Genre: Array,
    Author: Array,
    Image: String
});

const bookModel = mongoose.model('Book', bookSchema);
module.exports  = bookModel;

