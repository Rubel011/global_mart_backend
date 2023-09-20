const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");
const colors = require("colors");

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    // Validate the productId and quantity
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid product or quantity",
      });
    }

    // Find the product in the database
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    // Find or create the user's cart
    let userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      userCart = new cartModel({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingCartItem = userCart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      userCart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product added to cart successfully",
      data: userCart,
    });
  } catch (error) {
    console.error(colors.red("Error in addToCart: ", error.message));
    res.status(500).json({
      status: 500,
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

// View the user's cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user's cart
    const userCart = await cartModel
    .findOne({ user: userId })
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .populate("user");

    if (!userCart) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Cart retrieved successfully",
      data: userCart,
    });
  } catch (error) {
    console.error(colors.red("Error in viewCart: ", error.message));
    res.status(500).json({
      status: 500,
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

// Update quantities of items in the user's cart
exports.updateCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.userId;

    // Find the user's cart
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Cart not found",
      });
    }

    // Update quantities of items in the cart
    items.forEach((updatedItem) => {
      const cartItem = userCart.items.find(
        (item) => item.product.toString() === updatedItem.productId
      );
      if (cartItem) {
        cartItem.quantity = updatedItem.quantity;
      }
    });

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Cart updated successfully",
      data: userCart,
    });
  } catch (error) {
    console.error(colors.red("Error in updateCart: ", error.message));
    res.status(500).json({
      status: 500,
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

// Remove items from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId; // Get the user ID from the authenticated token

    // Find the user's cart
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Cart not found",
      });
    }

    // Remove the specified product from the cart
    userCart.items = userCart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product removed from cart successfully",
      data: userCart,
    });
  } catch (error) {
    console.error(colors.red("Error in removeFromCart: ", error.message));
    res.status(500).json({
      status: 500,
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
