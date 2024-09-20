const Book = require("../models/book.model");

const {
    buildErrorResponse,
    buildSuccessResponse,
    buildResponse,
    buildDataSuccessResponse,
} = require("../utils/response");

/** Add or edit books   */
addOrEditBook = async (req, res) => {
    try {
        var isEdit = req.params.id ? true : false;
        /** Handles edit */
        if (isEdit) {
            /** edit start */

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
                    return res
                        .status(400)
                        .json(buildErrorResponse((error = errorMessages)));
                } else {
                    return res.status(500).json(buildErrorResponse());
                }
            }
            /** end */
        } else {
            /** Handles adding book */
            const isExisting = await Book.findOne({ isbn: req.body.isbn });

            if (isExisting) {
                var msg = "This book is already in the store";
                return res.status(200).json(buildErrorResponse((error = msg)));
            }
            var bookBody = req.body;

            /** Register start */

            try {
                const bookDoc = await Book.create(bookBody);
                await bookDoc.save();

                return res
                    .status(201)
                    .json(
                        buildDataSuccessResponse(
                            (msg = "Successfully added book"),
                            (data = bookDoc)
                        )
                    );
            } catch (error) {
                console.log(error.message);
                if (error.name === "ValidationError") {
                    // Extract all error messages from validation errors
                    const errorMessages = Object.values(error.errors).map(
                        (error) => error.message
                    );
                    return res
                        .status(400)
                        .json(buildErrorResponse((error = errorMessages)));
                } else {
                    return res.status(500).json(buildErrorResponse());
                }
            }
            /** end */
        }
    } catch (error) {
        console.log("error: ", error.message);
        return res.status(500).json(buildErrorResponse());
    }
};

getBooks = async (req, res) => {
    const booksDoc = await Book.find().limit(20);
    if (!booksDoc) {
        return res
            .status(200)
            .json(buildErrorResponse((msg = "Failed to fetch books")));
    } else {
        return res.status(200).json({
            msg: "Books fetched successfully",
            length: booksDoc.length,
            data: booksDoc,
            flag: 1,
        });
    }
};

module.exports = {
    addOrEditBook,
    getBooks,
};
