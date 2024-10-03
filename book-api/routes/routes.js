var express = require("express");
var router = express.Router();
const Constants = require("../utils/constants");
const userController = require("../controllers/user.controller");
const bookController = require("../controllers/book.controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

/** User routes */
router.post("/register", userController.registerOrEditUser);
router.put(
    "/profile/edit/:id",
    authenticateJWT,
    authorizeRole(Constants.USER_ROLE),
    userController.registerOrEditUser
);
router.delete(
    "/profile/delete",
    authenticateJWT,
    authorizeRole(Constants.USER_ROLE),
    userController.deleteAccount
);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.put(
    "/profile/changePassword",
    authenticateJWT,
    userController.changePassword
);

/** Books routes */
router.post(
    "/addBook",
    authenticateJWT,
    authorizeRole(Constants.ADMIN_ROLE),
    bookController.addOrEditBook
);
router.put(
    "/book/edit/:id",
    authenticateJWT,
    authorizeRole(Constants.ADMIN_ROLE),
    bookController.addOrEditBook
);
router.post("/getBooks", bookController.getBooks);
router.get("/getBook/:id", bookController.getBookById);
router.get("/fetchCategories", bookController.fetchCategories);

module.exports = router;
