const axios = require("axios");
const { log } = require("console");
const fs = require("fs");
const path = require("path");

// URL of the API you want to fetch data from

// Fetch data from API
async function fetchBooks(category) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=40`;
    try {
        console.log(apiUrl);
        const response = await axios.get(apiUrl);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

// Format the fetched data
function formatBooks(books) {
    return books
        .filter((book) => {
            // Check if required fields are available
            const volumeInfo = book.volumeInfo || {};
            const saleInfo = book.saleInfo || {};
            const hasRequiredFields =
                volumeInfo.title &&
                volumeInfo.authors &&
                volumeInfo.publisher &&
                volumeInfo.description &&
                volumeInfo.publishedDate &&
                volumeInfo.pageCount &&
                volumeInfo.industryIdentifiers &&
                saleInfo.listPrice &&
                saleInfo.retailPrice &&
                volumeInfo.categories &&
                volumeInfo.imageLinks;

            return hasRequiredFields;
        })
        .map((book) => {
            return {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors.join(", "),
                publisher: book.volumeInfo.publisher,
                description: book.volumeInfo.description,
                publishedDate: book.volumeInfo.publishedDate,
                pageCount: book.volumeInfo.pageCount,
                isbn: extractISBN(book.volumeInfo.industryIdentifiers),
                listPrice: book.saleInfo.listPrice.amount,
                retailPrice: book.saleInfo.retailPrice.amount,
                currencyCode: book.saleInfo.retailPrice.currencyCode,
                categories: book.volumeInfo.categories.join(", "),
                imageLink: book.volumeInfo.imageLinks.thumbnail,
            };
        });
}

// Save formatted data to a JSON file
async function saveBooksToFile(category) {
    const books = await fetchBooks(category);
    const formattedBooks = formatBooks(books);
    console.log(formattedBooks);
    console.log(formattedBooks.length);

    let existingData = [];

    // Define the path where you want to save the JSON file
    // __dirname gives the directory name of the current module
    const filePath = path.join(__dirname, `books.json`);

    // Check if the file exists and read the existing data
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");
        existingData = JSON.parse(fileData);
    }

    // Combine existing and new data
    const combinedData = [...existingData, ...formattedBooks];

    // Write the combined data to the file
    fs.writeFile(filePath, JSON.stringify(combinedData, null, 2), (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
        } else {
            console.log("Books data has been saved to", filePath);
        }
    });
}

function extractISBN(industryIdentifiers) {
    if (!Array.isArray(industryIdentifiers)) {
        return "No ISBN"; // Return a default value if industryIdentifiers is not an array
    }

    // Find ISBN-13
    const isbn13 = industryIdentifiers.find((id) => id.type === "ISBN_13");
    if (isbn13) {
        return isbn13.identifier;
    }

    // If ISBN-13 is not available, find ISBN-10
    const isbn10 = industryIdentifiers.find((id) => id.type === "ISBN_10");
    if (isbn10) {
        return isbn10.identifier;
    }

    return "No ISBN"; // Return a default value if neither ISBN-13 nor ISBN-10 is found
}

const category_list = [
    "fiction",
    "math",
    "science",
    "nonfiction",
    "history",
    "geography",
    "management",
    "stress-management",
    "technology",
    "space-science",
    "biology",
    "chemistry",
    "physics",
    "games",
];

// Execute the script
async function mainFunc(category_list) {
    for (var i in category_list) {
        await saveBooksToFile(category_list[i]);
        console.log(`Saved ${category_list[i]}`);
    }
}

mainFunc(category_list);
