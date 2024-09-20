const mongoose = require("mongoose");

const validateISBN = (isbn) => {
    return /^(\d{10}|\d{13})$/.test(isbn);
};

const validateCurrencyCode = (code) => {
    return /^[A-Z]{3}$/.test(code);
};

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: 1,
    },
    author: { type: [String], default: [] },
    publisher: { type: String },
    publishedDate: { type: Date },
    description: { type: String },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        validate: [validateISBN, "Invalid ISBN format"],
    },
    listPrice: {
        type: Number,
        required: [true, "List Price is required"],
        min: [0, "Amount must be a positive number"],
    },
    retailPrice: {
        type: Number,
        required: [true, "Retail Price is required"],
        min: [0, "Amount must be a positive number"],
    },
    currencyCode: {
        type: String,
        required: [true, "Currency Code is required"],
        validate: [validateCurrencyCode, "Invalid currency code format"],
    },
    categories: {
        type: [String],
        required: [true, "Retail Price is required"],
        default: [],
    },
    pageCount: { type: Number, min: [1, "Page count must be at least 1"] },
    imageLink: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
