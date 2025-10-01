import productRouter from "./productPath"; 
import { Router } from "express";
import userRouter from "./userPath";
import cartRouter from "./cartPath";
import contactRouter from "./contactPath";

const mainRouter = Router();

mainRouter.use('/product', productRouter);
mainRouter.use("/user",userRouter);
mainRouter.use("/cart",cartRouter);
mainRouter.use("/contact",contactRouter);   

export default mainRouter;