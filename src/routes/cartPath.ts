import express from "express";
import { addToCart } from "../controllers/cartController";
import { Auth } from "../middlewares/authenitacationFunction";

const cartRouter = express();

cartRouter.post("/add-to-cart", Auth, addToCart);

export default cartRouter;
