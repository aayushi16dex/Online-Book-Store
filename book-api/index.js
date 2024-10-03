const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
// var logger = require('morgan');
app.use(cors());
require("dotenv").config();

/** Cors handling */
const allowedOrigins = ["http://localhost:7110"];

app.use(
    cors({
        credentials: true,
        origin: allowedOrigins,
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

/** Parses JSON data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

/** Database connection */
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error(err);
    });

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Enable Mongoose debug mode
mongoose.set("debug", true);

/** Routes */
var routes = require("./routes/routes");
app.use("/", routes);

app.listen(process.env.PORT, () =>
    console.log("Server is running on port", process.env.PORT)
);
