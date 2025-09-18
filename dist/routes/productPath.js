"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const authenitacationFunction_2 = require("../middlewares/authenitacationFunction");
const productRouter = (0, express_1.default)();
productRouter.post('/create-product', authenitacationFunction_1.requireSignin, authenitacationFunction_2.checkAdmin, productController_1.createProduct);
exports.default = productRouter;
