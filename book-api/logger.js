const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

// Define a custom log format for both console and file
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level.toUpperCase()}: ${message}`;
});

// Create a Winston logger
const logger = createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
    transports: [
        /** Generate logs in console */
        // new transports.Console({ eol: "" }),

        /** Generate logs in file */
        new transports.File({
            filename: "log/api.log",
            eol: " ",
        }),
        new transports.File({
            filename: "log/error.log",
            level: "error",
        }),
    ],
});

module.exports = logger;
