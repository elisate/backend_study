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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
const cloudhandle_1 = __importDefault(require("../utils/cloudhandle"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prodName, prodDesc, prodPrice, prodQty, image } = req.body;
        // if (!req.file) {
        //     return res.status(400).json({ message: "No image uploaded" });
        // }
        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: "products", 
        // });
        // const imageUrl=result.secure_url
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
            folder: "products"
        });
        const imageUrl = result.secure_url;
        // Create new product
        const newProduct = new productModel_1.Product({
            prodName,
            prodDesc,
            prodPrice,
            prodQty,
            image: imageUrl
        });
        const savedProduct = yield newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.Product.find();
        res.status(200).json({ message: 'Products fetched successfully', products });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.getAllProducts = getAllProducts;
