const app = require('express').Router();

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { createErrorResponse, createSuccessResponse, createResponse } = require('../utils/response');
// const { validateUser } = require('../../utils/validateUser')

/** Role and password cannot be updated through below functions*/
// var isExisting = false;

/** Register or edit user   */
registerOrEditUser = async (req, res) => {
    try {
        var isEdit = req.params.id ? true : false;
        /** Handles edit */
        if (isEdit) {
            if (req.userData.userId != req.params.id) {
                return res.status(403).json(createErrorResponse(error = 'Access denied'));
            }
            /** Checks if req email is not there in DB */
            else if (await isRequestedNewEmailPresent(req.body.email)) {
                return res.status(200).json(createErrorResponse(error = 'Requested email already exists'));
            }
            editUser(req, res)
        }
        /** Handles register */
        else {
            const isExisting = await User.findOne({ email: req.body.email });

            if (isExisting) {
                let msg = 'You have already registered';
                return res.status(200).json(createErrorResponse(error = msg));
            }

            var userBody = req.body;
            registerUser(userBody, res);
        }
    }
    catch (error) {
        console.log("error: ", error.message);
        return res.status(500).json(createErrorResponse());
    }
};

/** User or admin login */
loginUser = async (req, res) => {
    var userData;
    try {
        const userDoc = await User.findOne({ email: req.body.email });

        var role;
        if (!userDoc || userDoc.password != req.body.password) {
            return res
                .status(200)
                .json(createErrorResponse(error = 'Invalid credentials'));
        }
        else {
            role = userDoc.role;
            token = await createToken(userDoc._id.toString(), role);
            userData = userDoc;

        const { password, ...others } = userData._doc;

        return res
            .status(200)
            .json(createResponse(msg = 'Login successful', data = others, token = token))
        }
    }
    catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json(createErrorResponse());
    }
};

// For testing purpose
logoutUser = async (req, res) => {
    try {
        req.headers.authorization = '';
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error in logging out" });
    }
}

/* Function for creating token */
async function createToken(userId, role) {
    const expiresIn = 60 * 60 * 24 * 30; // 30 days in seconds
    const payload = {
        role: role,
        userId: userId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
}

/* Function for handling user register */
async function registerUser(userBody, res) {
    try {
        const userDoc = await User.create(userBody);
        await userDoc.save();
        const token = await createToken(userDoc._id, userDoc.role);
        const { password, ...others } = userDoc._doc;

        return res
            .status(201)
            .json(createResponse(msg = 'Successfully registered', data = others, token))
    }
    catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json(createErrorResponse());
    }
}

/* function for handling user updation */
async function editUser(req, res) {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            req.body,
            { new: true, runValidators: true } // ensures validation is run
        );

        const { password, ...others } = updatedUser._doc;

        return res
            .status(200)
            .json(createSuccessResponse(msg = 'User profile updated successfully', data = others))
    }
    catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json(createErrorResponse());
    }
}

// checks if requested new email is not already there in DB
async function isRequestedNewEmailPresent(email) {
    const response = await User.findOne({ email });
    return response ? true : false;
}

module.exports =
{
    loginUser,
    registerOrEditUser,
    logoutUser
}