"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const cartModel_1 = require("../models/cartModel");
const productModel_1 = require("../models/productModel");
// Add product to cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id; // From Auth middleware
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "ProductId is required" });
        }
        // Check if product exists
        const product = yield productModel_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Find user cart
        let cart = yield cartModel_1.Cart.findOne({ userId });
        if (!cart) {
            // Create new cart if not exists
            cart = new cartModel_1.Cart({
                userId,
                items: [{ product: productId, quantity: quantity || 1 }],
            });
        }
        else {
            // Check if product already in cart
            const existingItem = cart.items.find((item) => item.product.toString() === productId);
            if (existingItem) {
                // Increase quantity
                existingItem.quantity += quantity || 1;
            }
            else {
                // Add new item
                cart.items.push({ product: productId, quantity: quantity || 1 });
            }
        }
        yield cart.save();
        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            data: cart,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.addToCart = addToCart;
