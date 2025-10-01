"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productPath_1 = __importDefault(require("./productPath"));
const express_1 = require("express");
const userPath_1 = __importDefault(require("./userPath"));
const cartPath_1 = __importDefault(require("./cartPath"));
const contactPath_1 = __importDefault(require("./contactPath"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/product', productPath_1.default);
mainRouter.use("/user", userPath_1.default);
mainRouter.use("/cart", cartPath_1.default);
mainRouter.use("/contact", contactPath_1.default);
exports.default = mainRouter;
