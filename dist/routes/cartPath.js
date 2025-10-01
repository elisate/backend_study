"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const cartRouter = (0, express_1.default)();
cartRouter.post("/add-to-cart", authenitacationFunction_1.Auth, cartController_1.addToCart);
exports.default = cartRouter;
