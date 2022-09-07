// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/products")

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

// MIDDLEWARE  & BODY PARSER
app.use(express.urlencoded({ extended: true }));

// Routes / Controllers
// Seed
const productSeed = require('./models/productSeed.js');

app.get('/store/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/store');
	});
});
// ROUTES

// I N D U C E S

// INDEX
app.get('/store', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});
// NEW
app.get('/store/new', (req, res) => {
	res.render('new.ejs');
});
// DELETE

// UPDATE

// CREATE


app.post('/store', (req, res) => {
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/store");
    });
})


// EDIT

// SHOW
app.get('/store/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})