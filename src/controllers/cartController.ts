import { Request, Response } from "express";
import { Cart } from "../models/cartModel";
import { Product } from "../models/productModel";

// Add product to cart
export const addToCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // From Auth middleware
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if not exists
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Increase quantity
        existingItem.quantity += quantity || 1;
      } else {
        // Add new item
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
