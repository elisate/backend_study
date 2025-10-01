"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactController_1 = require("../controllers/contactController");
const express_1 = __importDefault(require("express"));
const contactRouter = (0, express_1.default)();
contactRouter.post("/createContact", contactController_1.createContact);
exports.default = contactRouter;
