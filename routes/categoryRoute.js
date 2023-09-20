// categoryRoutes.js
const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories
categoryRouter.get('/', categoryController.getAllCategories);

// GET a single category by ID
categoryRouter.get('/:id', categoryController.getCategoryById);

// POST a new category
categoryRouter.post('/', categoryController.createCategory);

// PUT (update) a category by ID
categoryRouter.put('/:id', categoryController.updateCategory);

// PATCH (partially update) a category by ID
categoryRouter.patch('/:id', categoryController.partiallyUpdateCategory);

// DELETE a category by ID
categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = categoryRouter;
