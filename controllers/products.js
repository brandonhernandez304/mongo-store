//DEPENDENCIES
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product')

// ROUTES
// SEED
const productSeed = require('../models/productSeed');
productRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/store');
    });
});
// I N D U C E S

// INDEX
productRouter.get('/', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});
// NEW
productRouter.get('/new', (req, res) => {
	res.render('new.ejs');
});
// DELETE
productRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/store');
    });
});

// UPDATE
productRouter.put('/:id', (req,res)=>{
    Product.findByIdAndUpdate(req.params.qty, (err, data)=>{
        res.redirect('/store');
    })
})

// CREATE


productRouter.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/store");
    });
})



// SHOW
productRouter.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});

// EDIT
productRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        console.log(foundProduct)
        res.render('edit.ejs', {
            product: foundProduct

        });
    });
});

// EXPORTS
module.exports = productRouter;