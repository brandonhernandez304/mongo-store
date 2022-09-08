// DEPENDENCIES
const express = require("express");
const app = express();
const productsRouter = require("./controllers/products.js");
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride= require("method-override");
// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE  
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use("/store", productsRouter)
app.use(express.static("public"))
// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})