"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productShema = new mongoose_1.Schema({
    prodName: { type: String, required: true },
    prodDesc: { type: String, required: false },
    prodPrice: { type: Number, required: true },
    prodQty: { type: Number, required: true }
}, {
    timestamps: true
});
exports.Product = (0, mongoose_1.model)('Product', productShema);
