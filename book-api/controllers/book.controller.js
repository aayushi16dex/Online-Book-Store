const Book = require("../models/book.model");

const {
    buildErrorResponse,
    buildSuccessResponse,
    buildResponse,
    buildDataResponse,
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
                const bookId = req.params.id;
                const updatedBook = await Book.findOneAndUpdate(
                    { _id: bookId },
                    req.body,
                    { new: true, runValidators: true } // ensures validation is run
                );

                return res
                    .status(200)
                    .json(
                        buildDataSuccessResponse(
                            (msg = `Book with id ${bookId} updated successfully`),
                            (data = updatedBook),
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
    const defaultRecordsPerPage = 20;
    var defaultPage = 0;
    // Handles negative page numbers
    const pageNumber = req.body.pageNumber
        ? Math.max(defaultPage, parseInt(req.body.pageNumber))
        : defaultPage;
    const searchTitle = req.body.searchTitle ? req.body.searchTitle.trim() : "";
    const categories = req.body.categories;
    const recordsPerPage = req.body.recordsPerPage
        ? req.body.recordsPerPage
        : defaultRecordsPerPage;

    var booksDoc;

    const regex = new RegExp(`.*${searchTitle}.*`, "i");
    const searchQuery = {
        title: regex,
        ...(categories?.length > 0 && { categories: { $in: categories } }),
    };

    try {
        totalRecordsFound = await Book.countDocuments(searchQuery);

        booksDoc = await Book.find(searchQuery)
            .skip(pageNumber * recordsPerPage)
            .limit(recordsPerPage);

        return res.status(200).json({
            totalRecords: totalRecordsFound,
            data: booksDoc,
            flag: 1,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(
                buildErrorResponse(
                    (msg = `Failed to fetch books error: ${error}`)
                )
            );
    }
};

getBookById = async (req, res) => {
    var bookId = req.params.id;
    try {
        const bookData = await Book.findById({ _id: bookId });
        if (!bookData) {
            return res
                .status(200)
                .json(
                    buildErrorResponse(
                        (msg = `No book with id ${bookId} found`)
                    )
                );
        } else {
            return res.status(200).json(buildDataResponse((data = bookData)));
        }
    } catch (error) {
        console.log("error: ", error.message);
        return res
            .status(200)
            .json(
                buildErrorResponse((msg = `No book with id ${bookId} found`))
            );
    }
};

fetchCategories = async (req, res) => {
    try {
        const distinctCategories = await Book.distinct("categories");
        return res.status(200).json({
            length: distinctCategories.length,
            data: distinctCategories,
            flag: 1,
        });
    } catch (error) {
        console.log("error: ", error.message);
        return res
            .status(200)
            .json(
                buildErrorResponse(
                    (msg = "Failed to fetch distinct categories")
                )
            );
    }
};

module.exports = {
    addOrEditBook,
    getBooks,
    getBookById,
    fetchCategories,
};
