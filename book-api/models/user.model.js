const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    _id: {
        type: mongoose.SchemaTypes.String,
    },
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
    
},
{timestamp: true},
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

