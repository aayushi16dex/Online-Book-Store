const mongoose = require('mongoose');
const Constant = require('../utils/constants');


const userSchema = mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: [false]
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Password is required"]
    },
    role: {
        type: Number,
        default: Constant.USER_ROLE
    }
},
{timestamp: true},
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

