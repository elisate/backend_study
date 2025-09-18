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
exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prodName, prodDesc, prodPrice, prodQty } = req.body;
        const newProduct = new productModel_1.Product({
            prodName,
            prodDesc,
            prodPrice,
            prodQty
        });
        const savedProduct = yield newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.createProduct = createProduct;
