//DEPENDENCIES
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product')

// ROUTES

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
productRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedProduct) => {
        res.redirect(`/store/${req.params.id}`);
    });
});
// CREATE


productRouter.post('/', (req, res) => {
    // if (req.body.completed === 'on') {
    //     //if checked, req.body.completed is set to 'on'
    //     req.body.completed = true;
    // } else {
    //     //if not checked, req.body.completed is undefined
    //     req.body.completed = false;
    // }
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