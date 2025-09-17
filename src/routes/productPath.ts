import { createProduct } from "../controllers/productController";
import express from "express";
import { requireSignin } from "../middlewares/authenitacationFunction";
import { checkAdmin } from "../middlewares/authenitacationFunction";

const productRouter = express();
productRouter.post('/create-product',requireSignin,checkAdmin,createProduct);

export default productRouter;

