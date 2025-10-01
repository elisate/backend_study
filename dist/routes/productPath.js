"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../utils/multer"));
const uploading = multer_1.default.single('image');
// import upload from "../utils/multer";
// const uploading=upload.single('image');
const productRouter = (0, express_1.default)();
productRouter.post('/create-product', uploading, productController_1.createProduct);
productRouter.get('/get-all-products', productController_1.getAllProducts);
exports.default = productRouter;
