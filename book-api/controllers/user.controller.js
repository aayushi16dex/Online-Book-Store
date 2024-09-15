const app = require("express").Router();
const bcrypt = require("bcrypt"); //password hashing
const bcryptSalt = process.env.SALT_ROUNDS;
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  buildErrorResponse,
  buildSuccessResponse,
  buildResponse,
  buildDataSuccessResponse,
} = require("../utils/response");

/** Role and password cannot be updated through below functions*/

/** Register or edit user   */
registerOrEditUser = async (req, res) => {
  try {
    var isEdit = req.params.id ? true : false;
    /** Handles edit */
    if (isEdit) {
      if (req.userData.userId != req.params.id) {
        return res
          .status(403)
          .json(buildErrorResponse((error = "Access denied")));
      } else if (await isRequestedNewEmailPresent(req.body.email)) {
        /** Checks if req email is not there in DB */
        return res
          .status(200)
          .json(buildErrorResponse((error = "Requested email already exists")));
      }
      editUser(req, res);
    } else {
      /** Handles register */
      const isExisting = await User.findOne({ email: req.body.email });

      if (isExisting) {
        var msg = "You have already registered";
        return res.status(200).json(buildErrorResponse((error = msg)));
      }
      var userBody = req.body;
      userBody.password = await hashPassword(userBody.password);
      registerUser(userBody, res);
    }
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json(buildErrorResponse());
  }
};

/** User or admin login */
loginUser = async (req, res) => {
  var userData;
  try {
    const userDoc = await User.findOne({ email: req.body.email });
    if (!userDoc) {
      return res
        .status(200)
        .json(buildErrorResponse((error = "Invalid credentials")));
    }
    var role;
    var storedPassword = userDoc.password;
    const matchPassword = await bcrypt.compare(
      req.body.password,
      storedPassword
    );
    if (!matchPassword) {
      return res
        .status(200)
        .json(buildErrorResponse((error = "Invalid credentials")));
    } else {
      role = userDoc.role;
      token = await createToken(userDoc._id.toString(), role);
      userData = userDoc;

      const { password, ...others } = userData._doc;

      return res
        .status(200)
        .json(
          buildResponse(
            (msg = "Login successful"),
            (data = others),
            (token = token)
          )
        );
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(buildErrorResponse());
  }
};

// For testing purpose
logoutUser = async (req, res) => {
  try {
    req.headers.authorization = "";
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error in logging out" });
  }
};

/**  Delete a user account - Cascade delete (user, cartder) **/
deleteAccount = async (req, res) => {
  try {
    const passwordMatches = await comparePassword(
      res,
      req.userData,
      req.body.password
    );
    if (!passwordMatches) {
      return res
        .status(401)
        .json(buildErrorResponse((error = "Incorrect password")));
    } else {
      const response = await User.deleteOne({ _id: req.userData.userId });
      if (response.deletedCount == 1)
        res
          .clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          })
          .status(200)
          .json({ msg: "Account deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

changePassword = async (req, res) => {
  const userId = req.userData.userId;
  const oldPassword = req.body.oldPassword;

  const passwordMatches = await comparePassword(res, req.userData, oldPassword);
  if (!passwordMatches) {
    return res.status(400).json({ msg: "Incorrect old password" });
  }

  const salt = await bcrypt.genSalt(Number(bcryptSalt));
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  try {
    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true } // returns modified doc
    );
    res.status(200).json({ error: "Password changed successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Function for creating token */
async function createToken(userId, role) {
  const expiresIn = 60 * 60 * 24 * 30; // 30 days in seconds
  const payload = {
    role: role,
    userId: userId,
  };
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
      .json(
        buildResponse((msg = "Successfully registered"), (data = others), token)
      );
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      // Extract all error messages from validation errors
      const errorMessages = Object.values(error.errors).map(
        (error) => error.message
      );
      return res.status(400).json(buildErrorResponse((error = errorMessages)));
    } else {
      return res.status(500).json(buildErrorResponse());
    }
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
      .json(
        buildDataSuccessResponse(
          (msg = "User profile updated successfully"),
          (data = others),
          (flag = 1)
        )
      );
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      // Extract all error messages from validation errors
      const errorMessages = Object.values(error.errors).map(
        (error) => error.message
      );
      return res.status(400).json(buildErrorResponse((error = errorMessages)));
    } else {
      return res.status(500).json(buildErrorResponse());
    }
  }
}

// checks if requested new email is not already there in DB
async function isRequestedNewEmailPresent(email) {
  const response = await User.findOne({ email });
  return response ? true : false;
}

async function hashPassword(userPassword) {
  salt = await bcrypt.genSalt(Number(bcryptSalt));
  hashedPassword = await bcrypt.hash(userPassword, salt);
  return hashedPassword;
}

async function comparePassword(res, userData, password) {
  var userDoc = await User.findOne({ _id: userData.userId }, { password: 1 });

  if (!userDoc) {
    return res.status(200).json(buildErrorResponse((msg = "User not found")));
  }
  var storedPassword = userDoc.password;
  const isPasswordCorrect = await bcrypt.compare(password, storedPassword);

  return isPasswordCorrect;
}

module.exports = {
  loginUser,
  registerOrEditUser,
  logoutUser,
  deleteAccount,
  changePassword,
};
