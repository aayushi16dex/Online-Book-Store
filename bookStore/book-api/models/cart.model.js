const mongoose = require('mongoose');


const cartDataSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Book Id is required"]
    }

    // quantity: {
    //     type: mongoose.SchemaTypes.Number,
    //     required: [true, "Quantity is required"]
    // }
},
    { _id: false }
);

const cartSchema = new mongoose.Schema({
    // email
    _id: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Id is required"],
    },
    cart: [cartDataSchema]
},
    { timestamp: true });

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel;

