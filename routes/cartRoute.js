// Routes for Cart Management
const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');

// View Cart
cartRouter.get('/', cartController.viewCart);

// Add to Cart
cartRouter.post('/create', cartController.addToCart);

// Update Cart
cartRouter.put('/update', cartController.updateCart);

// Remove from Cart
cartRouter.delete('/delete/:productId', cartController.removeFromCart);

module.exports = cartRouter;
