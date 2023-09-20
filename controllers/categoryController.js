const { successResponse, errorResponse } = require("../helpers/successAndError");
const Category = require("../models/categoryModel");

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(successResponse(200, "Category retrived successfully",categories));
  } catch (error) {
    res.status(500).json(errorResponse(500, error.message));
  }
};

// GET a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json(errorResponse(404, 'Category not found'));
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const category = new Category({ name, description });
    const savedCategory = await category.save();
    res.status(201).json(successResponse(201, "New Category created successfuldy", savedCategory));
  } catch (error) {
    res.status(400).json(errorResponse(400,error.message));
  }
};

// PUT (update) a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH (partially update) a category by ID
exports.partiallyUpdateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
