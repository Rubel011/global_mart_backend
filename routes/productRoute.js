// routes/productRoutes.js
const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');


/**
 * @route   GET /api/products/
 * @desc    Get all products
 * @access  Public
 */
// GET /api/products
productRouter.get('/', productController.getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by id
 * @access  Public
 */
// GET /api/products/:id
productRouter.get('/:id', productController.getProductById);


/**
 * @route   POST /api/products/create
 * @desc    creates a new product
 * @access  Private (Admin)
 */
// POST /api/products/create
productRouter.post('/', productController.createProduct);

/**
 * @route   PUT /api/products/update/:id
 * @desc    updates a product using the specified id
 * @access  Private (Admin)
 */
// PUT /api/products/update/:id
productRouter.put('/:id', productController.updateProduct);

// patch (partially update) /api/products/update/:id
// productRouter.patch('/update/:id', productController.updateProduct);

/**
 * @route   GET /api/products/delete/:id
 * @desc    Delete a product using the specified id.
 * @access  Privates (Admin)
 */
// DELETE /api/products/delete/:id
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
